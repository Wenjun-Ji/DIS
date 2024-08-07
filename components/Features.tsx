import React from 'react';

export default function Features() {
  return (
    <div className="flex flex-col gap-i500 px-4 sm:px-6 md:px-8 xl:px-10 py-e500 m-5" data-translation-key="5ed8ea1d-d8ff-46cd-98ed-114e53b3d79e">
      <div className=""> {/* 添加标题区域与视频区域之间的间隔 */}
        <div className="mx-auto md:text-center">
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl" style={{marginTop: '20px'}}>
            Discover our latest Model features
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
           
          </p>
        </div>
      </div>

      <div className="mb-10"> {/* 添加视频区域与底部区域之间的间隔 */}
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-800 mx-auto w-full transition-all max-w-[384px] sm:max-w-lg lg:max-w-[792px]"> {/* 修改圆角大小 */}
          <video
            src="/feature.mp4"
            className="h-full w-full outline-none"
            poster=""
            playsInline
            draggable={true}
            controls={true}
          />
        </div>
      </div>
    </div>
  );
}
