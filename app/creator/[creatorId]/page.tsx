import { CurrentlyPlaying } from "@/components/CurrentlyPlaying";
import { SongQueue } from "@/components/SongQueue";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { StreamProvider } from "../../../context/StreamProvider";

export default async function CreatorIdPage({
  params: { creatorId },
}: {
  params: { creatorId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className=" p-8 ">
      <div className="max-w-5xl mx-auto space-y-8">
        <StreamProvider creatorId={creatorId}>
          <CurrentlyPlaying creatorId={creatorId} isCreator={false} />
          <SongQueue userId={session.user.id} />
        </StreamProvider>
      </div>
    </div>
  );
}
