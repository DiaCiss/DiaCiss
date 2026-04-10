export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-sand-200 border-t-primary-500 animate-spin" />
        <p className="text-sand-400 text-sm">Chargement...</p>
      </div>
    </div>
  )
}
