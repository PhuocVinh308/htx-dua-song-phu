import test from 'node:test';
import assert from 'node:assert/strict';
import { loadComponent, renderToHtml } from './e2e/test-helpers.js';

test('AI Video Showcase Suite', async (t) => {
  await t.test('1. VideoModal renders video element, captions, and playback controls when open', async () => {
    const VideoModal = await loadComponent('components/VideoModal.jsx');
    const html = renderToHtml(VideoModal, {
      isOpen: true,
      onClose: () => {},
    });

    assert.ok(html.includes('<video'), 'Must contain <video> element');
    assert.ok(html.includes('./videos/htx-dua-song-phu-intro.mp4'), 'Must point to the AI rendered mp4 file');
    assert.ok(html.includes('./videos/video-poster.jpg'), 'Must have high quality video poster');
    assert.ok(html.includes('LỒNG TIẾNG THUYẾT MINH') || html.includes('VIDEO AI'), 'Must display video showcase voiceover badge');
    assert.ok(html.includes('Vùng nguyên liệu hữu cơ'), 'Must display scene 1 caption');
    assert.ok(html.includes('Chứng nhận OCOP 4 sao') || html.includes('OCOP bốn sao'), 'Must display scene 7 caption');
  });

  await t.test('2. VideoModal renders nothing when isOpen is false', async () => {
    const VideoModal = await loadComponent('components/VideoModal.jsx');
    const html = renderToHtml(VideoModal, {
      isOpen: false,
      onClose: () => {},
    });

    assert.strictEqual(html, '', 'VideoModal must return empty markup when closed');
  });

  await t.test('3. HeroSlider renders Watch Video button alongside Explore button', async () => {
    const HeroSlider = await loadComponent('components/HeroSlider.jsx');
    const html = renderToHtml(HeroSlider, {
      banner: {
        bgImage: './banners/farm-grove.jpg',
        subtitle: 'Đặc sản Song Phú',
        title: 'Nông Sản Xanh',
        desc: 'Hợp tác xã dừa hữu cơ Tam Bình',
        btnText: 'Khám phá ngay',
      },
      onExploreClick: () => {},
      onWatchVideo: () => {},
    });

    assert.ok(html.includes('Xem Video Giới Thiệu'), 'HeroSlider must have Watch Video button');
    assert.ok(html.includes('Khám phá ngay'), 'HeroSlider must preserve Explore button');
  });

  await t.test('4. AboutSection renders Watch Video trigger button', async () => {
    const AboutSection = await loadComponent('components/AboutSection.jsx');
    const html = renderToHtml(AboutSection, {
      coopInfo: {},
      onMoreClick: () => {},
      onWatchVideo: () => {},
    });

    assert.ok(html.includes('Thước phim HTX') || html.includes('Xem video'), 'AboutSection must have video trigger button');
    assert.ok(html.includes('Xem thêm'), 'AboutSection must preserve Read More button');
  });

  await t.test('5. AboutPage renders full Video Showcase banner with Play button', async () => {
    const AboutPage = await loadComponent('components/AboutPage.jsx');
    const html = renderToHtml(AboutPage, {
      coopInfo: {},
      onWatchVideo: () => {},
    });

    assert.ok(html.includes('THƯỚC PHIM GIỚI THIỆU HTX'), 'AboutPage must feature video showcase banner');
    assert.ok(html.includes('XEM VIDEO'), 'AboutPage must have bold Play Video button');
    assert.ok(html.includes('Hành trình Nông sản Xanh Song Phú'), 'AboutPage must display showcase subtitle');
  });
});
