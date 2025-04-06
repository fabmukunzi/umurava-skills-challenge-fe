import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { ParticipantChallenge } from '@/lib/types/project';

const ParticipantsCard = ({
  participants,
}: {
  participants: ParticipantChallenge[];
}) => (
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
              className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md"
            >
              <Image
                src={teamLead.profile_url}
                alt={`${teamLead.names}'s profile`}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <p className="font-semibold text-gray-800">{teamLead.names}</p>
                <p className="text-sm text-gray-500">{teamLead.email}</p>
              </div>
            </div>
          ))}
          {participants.length > 5 && (
            <Button className="w-full h-12 text-base font-medium">
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
);

export default ParticipantsCard;
