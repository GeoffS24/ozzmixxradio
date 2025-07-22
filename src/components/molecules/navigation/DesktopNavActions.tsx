export function DesktopNavActions() {
  return (
    <div className="flex justify-center items-center gap-4">
      <button className="flex px-5 py-2 justify-center items-center gap-2 border border-border text-base font-medium leading-[150%] text-foreground hover:bg-muted transition-colors">
        Listen
      </button>
      <button className="flex px-5 py-2 justify-center items-center gap-2 border border-persimmon bg-persimmon text-base font-medium leading-[150%] text-white hover:bg-persimmon-600 transition-colors">
        Subscribe
      </button>
    </div>
  )
}
