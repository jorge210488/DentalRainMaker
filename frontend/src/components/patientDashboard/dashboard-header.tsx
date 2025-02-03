interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({ heading, text }: DashboardHeaderProps) {
  return (
    <div className='relative mb-8 space-y-2 lg:left-[2%]'>
      <h1 className='text-3xl font-bold tracking-tight'>{heading}</h1>
      {text && <p className='text-muted-foreground'>{text}</p>}
    </div>
  )
}
