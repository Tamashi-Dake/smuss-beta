export const dynamic = "force-dynamic";
// TODO: Invariant: cookies() expects to have requestAsyncStorage -> Node.js run time ( khả năng do cookie của supabaseServer)
const AritstPage = ({ params }: { params: { id: string } }) => {
  // Fetch playlist data based on the id

  return (
    <div className="text-white">
      <h1>Artist Page</h1>
      <p>Artist ID: {params.id}</p>
      {/* Render playlist content */}
    </div>
  );
};

export default AritstPage;
