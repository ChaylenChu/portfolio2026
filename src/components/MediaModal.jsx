import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function MediaModal({ work, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  if (!work) return null

  const isAudio = work.mediaUrl?.endsWith('.m4a') || work.type === 'audio'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-sm sm:p-10">
      {/* 关闭按钮 - 确保高层级和白线显示 */}
      <button
        onClick={onClose}
        className="fixed right-6 top-6 z-[110] p-2 text-white/50 hover:text-white transition-colors focus:outline-none"
        aria-label="Close modal"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="relative h-full w-full max-w-6xl overflow-y-auto bg-black scrollbar-hide">
        {/* 媒体展示区 */}
        <div className="aspect-video w-full bg-neutral-900 shadow-2xl">
          {work.mediaUrl ? (
            isAudio ? (
              <div className="flex h-full flex-col items-center justify-center bg-neutral-950 p-8 text-center">
                <img src={work.cover} alt="" className="mb-8 h-48 w-48 object-cover opacity-50 shadow-2xl grayscale" />
                <audio controls className="w-full max-w-md accent-white">
                  <source src={work.mediaUrl} type="audio/x-m4a" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <video controls autoPlay className="h-full w-full object-contain">
                <source src={work.mediaUrl} type="video/mp4" />
              </video>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-600 italic">
              Coming soon
            </div>
          )}
        </div>

        {/* 内容区域 - 强制左右布局 */}
        <div className="mt-12 flex flex-col gap-16 pb-20 md:flex-row md:items-start md:justify-between">
          
          {/* 左侧：About */}
          <div className="flex-1 space-y-8">
            <header>
              <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                {work.year} · {work.type}
              </p>
              <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white sm:text-4xl">
                {work.title}
              </h2>
            </header>

            <div className="max-w-2xl">
              <h3 className="mb-6 text-[11px] uppercase tracking-[0.2em] text-neutral-400">About the Project</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
                {work.about}
              </p>
            </div>
          </div>

          {/* 右侧：Technical Sheet (固定宽度，防止掉下去) */}
          <div className="w-full shrink-0 space-y-10 md:w-80">
            <div>
              <h3 className="mb-6 text-[11px] uppercase tracking-[0.2em] text-neutral-400">Technical Sheet</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Role</p>
                  <p className="text-sm font-light text-neutral-300">{work.role}</p>
                </div>
                {work.visualCollaborator && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Visual Collaborator</p>
                    <p className="text-sm font-light text-neutral-300">{work.visualCollaborator}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-[11px] uppercase tracking-[0.2em] text-neutral-400">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {work.tools?.map((tool) => (
                  <span key={tool} className="border border-neutral-800 px-3 py-1 text-[10px] tracking-wider text-neutral-400">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}