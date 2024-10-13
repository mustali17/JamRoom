import { CurrentlyPlaying } from "@/components/CurrentlyPlaying";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SongQueue } from "@/components/SongQueue";
import { StreamProvider } from "@/context/StreamProvider";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className=" p-8 ">
      <div className="max-w-5xl mx-auto space-y-8">
        <StreamProvider creatorId={session.user.id}>
          <DashboardHeader userId={session.user.id} />
          {/* Currently Playing & Add Song */}
          <CurrentlyPlaying creatorId={session.user.id} isCreator={true} />
          {/* Song Queue */}
          <SongQueue userId={session.user.id} />
        </StreamProvider>
      </div>
    </div>
  );
};

export default Dashboard;
