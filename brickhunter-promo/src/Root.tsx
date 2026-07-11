import "./index.css";
import { Composition } from "remotion";
import { BrickhunterPromo } from "./BrickhunterPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BrickhunterPromo"
      component={BrickhunterPromo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
