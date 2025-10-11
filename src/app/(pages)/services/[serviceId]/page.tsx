import Service from "@/pages/Service";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  // Await the params promise
  const resolvedParams = await params;
  
  return <Service serviceId={resolvedParams.serviceId} />;
}



// import Service from "@/pages/Service";

// export default function ServicePage({
//   params,
// }: {
//   params: { serviceId: string };
// }) {
//   return <Service serviceId={params.serviceId} />;
// }