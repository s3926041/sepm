import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import gmatch from "../Assest/gamedesign.png"


const stats = [
    { name: 'Servers worldwide', value: '12' },
    { name: 'Full-time Users', value: '300M+' },
    { name: 'New Members Per Week', value: '400+' },
    { name: 'Interesting Features', value: 'Unlimited' },
]

export default function AboutUs() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
           
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <Typography
                        level="body-lg"
                        fontWeight="large"
                        fontSize={40}
                        textColor="#fff"
                        mb={{ xs: 8, sm: 6 }}
                        textAlign={"center"}

                    >
                       About Us
                    </Typography>
                        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
                            <CardCover>
                            <img alt="Gmatch" src={gmatch} style={{ objectFit: "cover" }} />
                            </CardCover>
                        <CardContent className="mx-auto">
                                <Typography
                                    level="body-lg"
                                    fontWeight="lg"
                                    textColor="#fff"
                                    mt={{ xs: 18, sm: 20 }}
                                    mb={{ xs: 8, sm: 2 }}
                                    
                                >
                                    Where Gamers Connected!
                                </Typography>
                            </CardContent>
                        </Card>

                    <dl className="mt-16 flex lg:flex-row md:flex-col sm:flex-col justify-between">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse">
                                <dt className="text-center leading-7 text-gray-300">{stat.name}</dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
