import React from 'react'

const Footer = () => {
    return (
        <div class="text-gray-100 bg-gray-800 mt-10" id="footer">
            <div class="max-w-3xl mx-auto py-6">
                <h1 class="text-center text-lg lg:text-2xl">
                    Si desea recibir información sobre nuestras ofertas <br></br> Envianos un correo
                </h1>

                <div class="flex justify-center mt-6">
                    <div class="bg-white rounded-md">
                        <div class="flex flex-wrap justify-between md:flex-row">
                            <input type="email" class="m-1 p-2 appearance-none text-gray-700 text-sm focus:outline-none focus:placeholder-transparent" placeholder="Enter your email" arial-label="Enter your email"></input>
                            <button class="w-full m-1 p-2 text-sm bg-gray-800 rounded font-semibold uppercase lg:w-auto hover:bg-gray-700">Informate</button>
                        </div>

                    </div>
                </div>

                <hr class="h-px mt-6 bg-gray-700 border-none"></hr>

                <div class="flex flex-col items-center justify-between mt-6 md:flex-row">
                    <div>
                        <a href="/home" class="text-xl font-bold text-gray-100 hover:text-gray-400">ForzaSoft</a>
                    </div>

                    <div class="flex mt-4 md:m-0">
                        <div class="flex mt-4 md:m-0">
                            <a href="/home" class="px-4 text-sm text-gray-100 font-medium hover_text-gray-400">Home</a>
                            <a href="/#Servicios" class="px-4 text-sm text-gray-100 font-medium hover_text-gray-400">Servicios</a>
                            <a href="/#Imagenes" class="px-4 text-sm text-gray-100 font-medium hover_text-gray-400">Imagenes</a>
                            <a href="/#footer" class="px-4 text-sm text-gray-100 font-medium hover_text-gray-400">Contactos</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;