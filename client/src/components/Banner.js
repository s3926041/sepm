import { XMarkIcon } from '@heroicons/react/20/solid'

import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Banner() {
    let date = new Date();
    let dat = date.getDate();
    let date2 = new Date(date);
    date2.setDate(dat + 7);
    let dat2 = date2.getDate();

    let month = "";
    let month1 = "";
    switch (date.getMonth()){
        case 0: month = "Jan";  break;
        case 1: month = "Feb";  break;
        case 2: month = "Mar";  break; 
        case 3: month = "Arp"; break;
        case 4: month = "May";  break;
        case 5: month = "Jun"; break;
        case 6: month = "July"; break;
        case 7: month = "Aug";  break;
        case 8: month = "Sep";  break;
        case 9: month = "Oct";  break;
        case 10: month = "Nov";  break;
        case 11: month = "Dec";  break;   
    }

    switch (date2.getMonth()) {
        case 0:  month1 = "Jan"; break;
        case 1:  month1 = "Feb"; break;
        case 2:  month1 = "Mar"; break;
        case 3: month1 = "Arp"; break;
        case 4:  month1 = "May"; break;
        case 5:  month1 = "Jun"; break;
        case 6:  month1 = "July"; break;
        case 7: month1 = "Aug"; break;
        case 8:  month1 = "Sep"; break;
        case 9:  month1 = "Oct"; break;
        case 10:  month1 = "Nov"; break;
        case 11:  month1 = "Dec"; break;
    }
    


    const [hidden, setHidden] = useState(true);
    return (
        hidden ? 
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm leading-6 text-gray-900">
                    <strong className="font-semibold">Gmatch {date.getFullYear()}</strong>
                    <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    Join us in Hanoi from {month} {dat} - {month1} {dat2} to see what’s coming next.
                    
                </p>
                <Link
                    to="/createprofile"
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                    Register now <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
            <div className="flex flex-1 justify-end">
                <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={() => setHidden(false)}>
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
                </button>
            </div>
        </div>
        :
        <></>
    )
}
