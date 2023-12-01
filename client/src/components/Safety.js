import { SafetyOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
const posts = [
    {
        id: 1,
        title: 'Recognizing and Reporting Harmful Behavior',
        href: '/',
        description:
            "As gamers, we all want a safe and positive experience. Unfortunately, online platforms can attract individuals who engage in harmful behavior. In this blog, we'll discuss how to identify and report harmful behavior on Gmatch, ensuring a safe and enjoyable gaming environment for everyone.",
        date: 'Nov 21, 2023',
        datetime: '2023-11-21',
        category: { title: 'Skills', href: '/' },
        author: {
            name: 'Hung Nguyen',
            role: 'Founder / CTO',
            href: '/',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        title: 'Maintaining a Healthy Balance Between Gaming and Real Life',
        href: '/',
        description:
            'Gaming can be incredibly engaging, but its important to maintain a healthy balance between your online and offline life.In this blog, we will offer tips on managing your gaming time and ensuring it doesnt negatively impact your wellbeing.',
        date: 'Nov 21, 2023',
        datetime: '2023-11-21',
        category: { title: 'Skills', href: '/' },
        author: {
            name: 'Duc Nguyen',
            role: 'Project Manager',
            href: '/',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 3,
        title: 'Protecting Yourself from External Threats While Gaming',
        href: '/',
        description:
            'Gaming shouldnt leave you open to external threats.In this blog, we will share tips on protecting yourself from online scams, phishing attempts, and other malicious activities while using Gmatch.',
        date: 'Nov 21, 2023',
        datetime: '2023-11-21',
        category: { title: 'Skills', href: '/' },
        author: {
            name: 'Duong Le',
            role: 'Senior Developer',
            href: '/',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
]

export default function Safety() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl flex flex-col-reverse">Stay Safe While Gaming <SafetyOutlined className="mx-auto" style={{marginBottom: "20px"}} /></h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        A Guide to Dealing with Harmful Events on Gmatch and Beyond
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.datetime} className="text-gray-500">
                                    {post.date}
                                </time>
                                <Link
                                    to={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.category.title}
                                </Link>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <Link to={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </Link>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
