const ArchiveLayout = ({ archive, latest }) => {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section>{latest}</section>
    </div>
  );
};

export default ArchiveLayout;
