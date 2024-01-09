function Profile() {
    return ( 
        <>
            {/* This is an example component */}
                <div className=" group  ml-3 mr-3 mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700  rounded-xl">
                    <div className="pb-6">
                        
                        <div className="mt-2 mt-20 text-center">
                            <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                                Ariel Cerda
                            </h3>
  
                        <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                            
                            {/* /typography/_h3.antlers.html */}
                            <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono ">
                                Diseñador UI / Front-end
                            </div>
                            {/* End: /typography/_h3.antlers.html */}
                        </div>


                            
                        </div>

                        
                        <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-6">
                                    <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                        turpis orci, maximus sed purus a, cursus scelerisque purus.
                                        Morbi molestie, odio at sagittis rhoncus, felis massa iaculis
                                        mi, quis molestie erat ipsum vel risus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

        </>

     );
}

export default Profile;