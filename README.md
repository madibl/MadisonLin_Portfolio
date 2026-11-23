## 0. Initialization
1. Prep all assets in the assets folder.
2. Git init
3. Init Vite.

## 1. Build and ship the static version

1. Prepare a single flower composition. Export a realistic still and make the dotted version from the same image. Give both assets the same canvas size, crop, and flower position. Reveal the realistic layer through CSS-clipped windows. If the existing Figma crops come from different photos, decide which ones should become views into the same flower before animating them.
2. Build the homepage in layers. Use CSS for the background, typography, frames, and connector lines. Keep the name, intro, link labels, and social links as HTML. Use a shared, aspect-ratio-controlled stage for the flower and its windows so they scale together. CSS Modules are enough here. I’d skip MUI for the homepage.
3. Make the three destinations work. Use real links for About Me, Projects, and Résumé, with visible labels and keyboard focus. The current mockup uses project-style filenames, so settle which windows map to which destinations before positioning them. If case studies need shareable URLs, add routing when you build the first case study.
4. Compose a mobile version deliberately. Put the name and intro above the flower, use fewer overlapping windows if space gets tight, and put a compact text navigation row under the art. Keep the LeetCode bitmap in the upper-right on desktop and give it its own row on mobile. Start with an exported snapshot and a link to your profile. Keep its asset separate from the flower so you can update it independently.

Static release is ready when all three destinations work by touch and keyboard, the crops still line up at phone and desktop widths, and the page feels complete with the still flower. This is the version I’d deploy first.

## 2. Prototype the loop with one window

Start with a short loop and one realistic window. Try a subtle rotation first. If it’s a flat turn, you can test the effect with two still layers driven by the same transform. If you want the flower to turn in depth or the petals to unfold, author the source motion in Blender or use footage that already has the movement you want. Then use FFmpeg or a small offline script to create the dotted treatment and encode the result. The frame-processing script runs on your machine, so visitors only download the finished asset. FFmpeg filter documentation (https://ffmpeg.org/ffmpeg-filters.html)

The first production approach I’d test is one precomposited video. For each source frame, render the dotted flower and reveal the matching realistic pixels inside the fixed windows. Encode that as a short, silent MP4 loop. Place your existing HTML links over the video. Both treatments are baked into every frame, so pausing, buffering, or looping keeps them in sync. Use the same stage proportions for the still and the video. If mobile needs substantially different window positions, keep the static mobile composition for the first animation release and make a dedicated mobile loop later if it’s worth the extra asset work. HTML video standard (https://html.spec.whatwg.org/multipage/media.html#the-video-element)

If you later want the windows themselves to move with the petals, that’s a separate interaction task. You’d need to author their positions over time and use the presented video frame’s timestamp to move the HTML links. Prototype that with one window before committing to all three. Video frame callback documentation (https://github.com/mdn/content/blob/main/files/en-us/web/api/htmlvideoelement/requestvideoframecallback/index.md)

## 3. Test on phones, then add live LeetCode updates

- Animation performance. Test on an actual iPhone and Android phone. Check the loop seam, whether the dots stay crisp after compression, and how quickly the clip starts on a throttled connection. As an initial experiment, aim for a mobile loop under 1 MB and adjust after seeing the artwork at actual display size. Show the still immediately, keep it available if playback fails, honor reduced motion, and provide a pause control.
- LeetCode freshness. Once the snapshot looks right, verify what data source is available for your profile. If it can be pulled reliably, use a scheduled build or job to generate a cached bitmap or JSON file. The homepage can serve that file and keep showing the last successful snapshot if a refresh fails. Live updates can ship independently of the animation.

The milestone order I’d use is static homepage and navigation → one synchronized flower window → full desktop loop → mobile motion if it earns its place → automated LeetCode refresh. The asset decision to make now is the shared flower canvas. Getting that right in the static build makes the first animation prototype much smaller.