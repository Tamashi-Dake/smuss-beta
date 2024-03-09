export const dynamic = "force-dynamic";
// TODO: Invariant: cookies() expects to have requestAsyncStorage -> Node.js run time ( khả năng do cookie của supabaseServer)
const CategoryPage = ({ params }: { params: { id: string } }) => {
  // Fetch playlist data based on the id

  return (
    <div className="text-white">
      <h1>Category Page</h1>
      <p>Category ID: {params.id}</p>
      {/* Render playlist content */}
    </div>
  );
};

export default CategoryPage;
