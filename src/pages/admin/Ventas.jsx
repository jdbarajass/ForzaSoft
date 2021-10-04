
const Ventas = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
                Registrar Nueva Venta
            </h2>
            <form className="mt-6 w-3/5">
                <div>
                    <input
                        className="w-96 mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Cliente"
                        required
                    />

                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="number"
                        placeholder="Consecutivo"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="date"
                        placeholder="Fecha"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Vendedor"
                        required
                    />
                </div>

                <div className="flex flex-col w-full justify-center items-center">
                    <table>
                        <tr>
                            <th scope="col">Nombre producto</th>
                            <th scope="col">Precio unitario</th>
                            <th scope="col"></th>
                            <th scope="col">Unidades</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Subtotal</th>
                        </tr>

                        <tr>
                            <td>Reproductor MP3 (80 GB)</td>
                            <th scope="col"></th>
                            <td>192.02</td>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <td>1</td>
                            <th scope="col"></th>
                            <td>192.02</td>
                        </tr>

                        <tr>
                            <td>Fundas de colores</td>
                            <th scope="col"></th>
                            <td>199.99</td>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <td>1</td>
                            <th scope="col"></th>
                            <td>199.99</td>
                        </tr>

                        <tr>
                            <td>Reproductor de radio &amp; control remoto</td>
                            <th scope="col"></th>
                            <td>125.05</td>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <td>2</td>
                            <th scope="col"></th>
                            <td>250.10</td>
                        </tr>

                        <tr>
                            <th scope="row">TOTAL</th>
                            <th scope="col"></th>
                            <td></td>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <td>4</td>
                            <th scope="col"></th>
                            <td><strong>517.06</strong></td>
                        </tr>
                    </table>
                </div>

            </form>
        </div>
    )
}

export default Ventas
