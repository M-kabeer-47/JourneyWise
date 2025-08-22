export default function NoData({title,description,icon}:{title:string, description:string, icon:React.ReactNode}) {
  return (
    <div className="text-center py-16">
      <div className="sm:w-24 sm:h-24 w-[70px] h-[70px] bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-midnight-blue mb-2">
       {title}
      </h3>
      <p className="text-charcoal sm:text-sm text-xs mb-8 max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}
