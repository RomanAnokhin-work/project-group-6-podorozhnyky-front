import { User } from "@/types/user";

interface Props {
  traveller: User;
}

const TravellerInfo = ({ traveller }: Props) => {
  return <div>{traveller.name}</div>;
};

export default TravellerInfo;
