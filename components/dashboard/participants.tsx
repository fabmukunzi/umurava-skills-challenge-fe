import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { ParticipantChallenge } from '@/lib/types/project';
import { useRouter } from 'next/navigation';

const ParticipantsCard = ({
  participants,
}: {
  participants: ParticipantChallenge[];
}) => {
  const router = useRouter();
  return (
    <Card className="py-6">
      <h2 className="text-xl px-6 font-semibold mb-4">
        Participants <Badge className="text-white">{participants.length}</Badge>
      </h2>
      <div className="space-y-4 px-4">
        {participants?.length ? (
          <>
            {participants.map(({ _id, teamLead }) => (
              <div
                key={_id}
                className="flex items-center space-x-4 border-b py-2 px-6"
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden  border-2 border-primary/20">
                  <Image
                    src={teamLead.profile_url}
                    alt={`${teamLead.names}'s profile`}
                    className="w-full h-full object-cover"
                    width={50}
                    height={50}
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium">{teamLead.names}</p>
                  <p className="text-sm text-gray-500">{teamLead.email}</p>
                </div>
              </div>
            ))}
            {participants.length > 0 && (
              <Button className="w-full h-12 text-base font-medium" onClick={() => router.push('/dashboard/challenges/')}>
                View All
              </Button>
            )}
          </>
        ) : (
          <div className="text-gray-500 py-8 ml-5">
            <span className='text-3xl'>😜</span> No one joined yet
          </div>
        )}
      </div>
    </Card>
  )
};

export default ParticipantsCard;
