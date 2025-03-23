import { getAdsData } from "@/lib/actions/project-actions";
import { formatDateToShortDate } from "@/lib/utils/utils";

export default async function AdminPage() {
    const adsData = await getAdsData();
    console.log('adsData', adsData);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Pago por Minuto</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista de anuncios e histórico de Clicks
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="divide-x divide-gray-200">
                                    <th scope="col" className="py-3.5 pr-4 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Nombre del Usuario
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Telefono de Contacto
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Anuncio
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Ip del Usuario
                                    </th>
                                    <th scope="col" className="py-3.5 pr-4 pl-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                                        Fecha de Click
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {adsData && adsData.map((data) => (
                                    <tr key={data.id} className="divide-x divide-gray-200">
                                        <td className="py-4 pr-4 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                            {data.user.nombre}
                                        </td>
                                        <td className="p-4 text-sm whitespace-nowrap text-gray-500">{data.user.telefono}</td>
                                        <td className="p-4 text-sm whitespace-nowrap text-gray-500">{data.ad.title}</td>
                                        <td className="p-4 text-sm whitespace-nowrap text-gray-500">{data.ipAddress}</td>
                                        <td className="py-4 pr-4 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pr-0">{formatDateToShortDate(data.clickedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}