export default function Container({title, children}) {
    return(
        <div className="p-5 mt-5 border-1 rounded-2xl">
            <h1 className="font-bold">
                {title}
            </h1>
            {children}
        </div>
    )
}