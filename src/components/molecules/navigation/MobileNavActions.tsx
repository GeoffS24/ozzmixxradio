export function MobileNavActions() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 px-5">
      <button className="flex px-5 py-2 justify-center items-center gap-2 w-full text-sm font-medium text-foreground border border-border">
        Listen
      </button>
      <button className="flex px-5 py-2 justify-center items-center gap-2 w-full text-sm font-medium text-white bg-persimmon border border-persimmon">
        Subscribe
      </button>
    </div>
  )
}
