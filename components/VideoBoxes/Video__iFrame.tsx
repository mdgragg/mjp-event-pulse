import { StyledIFrame, StyledVideoBox } from './VideoBox__Styles';

type VideoBox__Props = {
  src: string;
};
const VideoBox = ({ src }: VideoBox__Props) => {
  return (
    <StyledVideoBox>
      <StyledIFrame
        src={src}
        // frameborder="0"
        webkitallowfullscreen={true}
        mozallowfullscreen={true}
        allow="fullscreen"
        allowfullscreen
        controls="false"
      />
    </StyledVideoBox>
  );
};

export default VideoBox;
