import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';

interface Participant {
  id: number;
  profileImage: string;
  fullName: string;
  occupation: string;
}

interface ParticipantCardProps {
  participants: Participant[];
}

const ParticipantsCard = ({ participants }: ParticipantCardProps) => (
  <Card className="py-6">
    <h2 className="text-xl px-6 font-semibold mb-4">
      Participants <Badge className="text-white">{participants.length}</Badge>
    </h2>
    <div className="space-y-2">
      {participants.slice(0, 5).map((participant) => (
        <div
          key={participant.id}
          className="flex items-center space-x-4 border-b py-2 px-6"
        >
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src={participant.profileImage}
              alt={`${participant.fullName}'s profile`}
              className="w-full h-full"
              width={50}
              height={50}
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{participant.fullName}</p>
            <p className="text-sm text-gray-500">{participant.occupation}</p>
          </div>
        </div>
      ))}
      {participants.length > 5 && (
        <div className="px-6 pt-4">
          <Button className="w-full h-12">View All</Button>
        </div>
      )}
    </div>
  </Card>
);

export default ParticipantsCard;
