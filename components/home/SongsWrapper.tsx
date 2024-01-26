import Song from "../shared/Song";

const SongsWrapper = () => {
  return (
    <div
      className="
    grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 rounded-md"
    >
      <Song image="/liked.png" title="title" href="/" />
      <Song image="/liked.png" title="title" href="/" />
      <Song image="/liked.png" title="title" href="/" />
      <Song image="/liked.png" title="title" href="/" />
      <Song image="/liked.png" title="title" href="/" />
      <Song image="/liked.png" title="title" href="/" />
    </div>
  );
};

export default SongsWrapper;
