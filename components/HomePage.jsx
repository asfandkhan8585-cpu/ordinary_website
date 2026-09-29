'use client';

    import { useState, useEffect, useRef } from 'react';

    const LogoMark = () => (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10.5" stroke="#10243A" strokeWidth="1.3" />
        <circle cx="14" cy="14" r="3.4" fill="#D84B47" />
        <circle cx="14" cy="14" r="10.5" stroke="#10243A" strokeWidth="0.6" strokeDasharray="1.5 3" opacity="0.4" />
      </svg>
    );

    function useReveal() {
      const ref = useRef(null);
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '-60px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
      }, []);
      return ref;
    }

    function Nav() {
      const [scrolled, setScrolled] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);
      useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      }, []);

      return (
        <header className={`sticky top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-paper/85 backdrop-blur-md border-b hairline' : 'bg-transparent border-b border-transparent'}`}>
          <nav className="relative mx-auto flex h-16 max-w-8xl items-center justify-between gap-3 px-5 sm:h-18 sm:px-8 lg:px-12">
            <a href="#top" className="flex items-center gap-0 -ml-1" aria-label="ordinarychat home">
              <LogoMark />
              <span className="font-display text-xl lowercase tracking-tight text-ink">rdinarychat</span>
            </a>
            <div className="hidden items-center gap-6 whitespace-nowrap md:flex">
              <a href="#faq" className="text-sm text-ink/70 transition-colors hover:text-ink">FAQ</a>
              <a href="/blog" className="text-sm text-ink/70 transition-colors hover:text-ink">Blog posts</a>
              <a href="https://www.linkedin.com/" className="text-sm text-ink/70 transition-colors hover:text-ink">View on LinkedIn</a>
              <a href="mailto:?subject=ordinarychat%20waitlist" className="text-sm text-ink/70 transition-colors hover:text-ink">Join waitlist</a>
            </div>
            <span className="hidden rounded-full border hairline px-4 py-2 text-sm font-medium text-clay md:inline">Coming soon</span>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-ink md:hidden" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d={menuOpen?'M6 6l12 12M18 6L6 18':'M4 7h16M4 12h16M4 17h16'} /></svg>
            </button>
            {menuOpen&&<div className="mobile-menu absolute inset-x-4 top-[4.5rem] flex flex-col rounded-2xl border hairline bg-paper p-2 shadow-float md:hidden">
              <a href="#faq" onClick={()=>setMenuOpen(false)} className="mobile-menu-link rounded-xl px-4 py-3 text-sm text-ink/75 hover:bg-sand/50">FAQ</a>
              <a href="/blog" onClick={()=>setMenuOpen(false)} className="mobile-menu-link rounded-xl px-4 py-3 text-sm text-ink/75 hover:bg-sand/50">Blog posts</a>
              <a href="https://www.linkedin.com/" onClick={()=>setMenuOpen(false)} className="mobile-menu-link rounded-xl px-4 py-3 text-sm text-ink/75 hover:bg-sand/50">View on LinkedIn</a>
              <a href="mailto:?subject=ordinarychat%20waitlist" onClick={()=>setMenuOpen(false)} className="mobile-menu-link rounded-xl px-4 py-3 text-sm text-ink/75 hover:bg-sand/50">Join waitlist</a>
              <span className="mx-4 mt-1 border-t hairline pt-3 pb-2 text-sm font-semibold text-clay">Coming soon</span>
            </div>}
          </nav>
        </header>
      );
    }

    function LottieArt({ file, className = '' }) {
      const box = useRef(null);
      useEffect(() => {
        if (!box.current) return;
        let animation;
        let active = true;
        const load = () => {
          if (!active || !box.current) return;
          if (!window.lottie) { window.setTimeout(load, 100); return; }
        const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        animation = window.lottie.loadAnimation({ container: box.current, renderer: 'svg', loop: !reduced, autoplay: !reduced, path: '/' + file + '.json' });
        if (reduced) animation.addEventListener('DOMLoaded', () => animation.goToAndStop(Math.round(animation.totalFrames / 2), true));
        };
        load();
        return () => { active = false; animation?.destroy(); };
      }, [file]);
      return <div ref={box} className={`lottie-box ${className}`} aria-hidden="true" />;
    }

    function FlowScene() {
      const rough='i keep thinkin abt how to say what i mean but my words come out messy and i dont know how to make them sound rite so ';
      const clear='OrdinaryChat turns rough thoughts into clear emails posts and everyday messages while keeping your own voice and ';
      const reduced=typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const roughMeasure=useRef(null);
      const clearMeasure=useRef(null);
      const incomingPaths=useRef([]);
      const outgoingPaths=useRef([]);
      const [lengths,setLengths]=useState({rough:0,clear:0});
      useEffect(()=>{
        let active=true;
        const measure=()=>{if(active&&roughMeasure.current&&clearMeasure.current)setLengths({rough:roughMeasure.current.getComputedTextLength(),clear:clearMeasure.current.getComputedTextLength()})};
        measure();
        document.fonts?.ready.then(measure);
        window.addEventListener('resize',measure);
        return()=>{active=false;window.removeEventListener('resize',measure)};
      },[]);
      useEffect(()=>{
        if(reduced||!lengths.rough||!lengths.clear)return;
        let frameId;
        let startedAt;
        const move=(time)=>{
          if(startedAt===undefined)startedAt=time;
          const roughOffset=(180+(time-startedAt)*.085)%lengths.rough;
          const clearOffset=(320+(time-startedAt)*.085)%lengths.clear;
          incomingPaths.current.forEach((path,index)=>path?.setAttribute('startOffset',String(index*lengths.rough-roughOffset)));
          outgoingPaths.current.forEach((path,index)=>path?.setAttribute('startOffset',String(770+(index-1)*lengths.clear-clearOffset)));
          frameId=requestAnimationFrame(move);
        };
        frameId=requestAnimationFrame(move);
        return()=>cancelAnimationFrame(frameId);
      },[lengths.rough,lengths.clear,reduced]);
      return <div className="ribbon-scene" role="img" aria-label="A continuous stream of imperfect writing curves into the OrdinaryChat O. Clear writing about emails, posts, and messages emerges in a straight line.">
        <svg className="flow-svg" viewBox="0 0 1440 390" aria-hidden="true">
          <defs><path id="incoming-curve" d="M 840 195 C 930 92 1005 102 1070 195 C 1135 285 1220 280 1280 195 S 1490 110 1700 195" /><path id="outgoing-line" d="M -160 195 L 610 195" /></defs>
          <path d="M 840 195 C 930 92 1005 102 1070 195 C 1135 285 1220 280 1280 195 S 1490 110 1700 195" fill="none" stroke="#c8d8e6" strokeWidth="2" opacity=".8" />
          <path d="M -160 195 L 610 195" fill="none" stroke="#c8d8e6" strokeWidth="2" opacity=".8" />
          <text ref={roughMeasure} className="flow-rough" visibility="hidden">{rough}</text>
          <text ref={clearMeasure} className="flow-clear" visibility="hidden">{clear}</text>
          {[0,1,2].filter(index=>index===0||(!reduced&&lengths.rough>0)).map(index=><text className="flow-rough" key={index}><textPath ref={node=>{incomingPaths.current[index]=node}} href="#incoming-curve" startOffset={reduced?'0':String(index*lengths.rough-180)}>{rough}</textPath></text>)}
          {[0,1,2].filter(index=>index===0||(!reduced&&lengths.clear>0)).map(index=><text className="flow-clear" key={index}><textPath ref={node=>{outgoingPaths.current[index]=node}} href="#outgoing-line" startOffset={reduced?'0':String(770+(index-1)*lengths.clear-320)}>{clear}</textPath></text>)}
          <g className="flow-logo" transform="translate(720 195)"><g className="flow-logo-orbit"><circle r="126" fill="none" stroke="#80aed4" strokeWidth="2" strokeDasharray="6 12" /><circle cx="0" cy="-126" r="6" fill="#D84B47" /></g><circle r="110" fill="#fff" stroke="#10243A" strokeWidth="7" /><circle className="flow-logo-core" r="34" fill="#D84B47" /></g>
          <text x="50" y="355" fill="#657b90" fontSize="14" letterSpacing="2">CLEAR WRITING OUT</text><text x="1195" y="355" fill="#657b90" fontSize="14" letterSpacing="2">ROUGH THOUGHT IN</text>
        </svg>
        <div className="flow-mobile" aria-hidden="true"><div className="mobile-logo-orbit"><span className="h-9 w-9 rounded-full bg-clay" /></div></div>
      </div>;
    }

    function Hero() {
      return (
        <section id="top" className="relative overflow-hidden">
          <div className="drift-texture pointer-events-none absolute inset-0" aria-hidden="true" /><div className="hero-watermark" aria-hidden="true">ordinarychat</div>
          <div className="relative mx-auto max-w-8xl px-5 pb-0 pt-10 sm:px-8 sm:pb-0 sm:pt-14 lg:px-12 lg:pt-16">
            <div className="max-w-3xl text-left">
              <h1 className="mt-2 font-display text-[2.7rem] font-light leading-[1.04] tracking-tight text-ink sm:mt-4 sm:text-6xl lg:text-[5.5rem]">Every thought,<br /><em className="text-olive">beautifully expressed.</em></h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">Turn rough ideas into clear posts, emails, and everyday messages while keeping your own voice.</p>
            </div>
            <div className="flow-bleed mt-8 sm:mt-10"><FlowScene /></div>
          </div>
        </section>
      );
    }

    function RewriteShowcase() {
      const tones=['Natural','Confident','Professional','Friendly'];
      const draft='hey, i wanted to follow up on the proposal and see what you think';
      const versions=[
        [['Hi, ',true],['I wanted to follow up on the proposal ',false],['and hear what you think.',true]],
        [['I’m following up on the proposal ',true],['and would value your perspective on the direction.',true]],
        [['I’m writing to follow up on the proposal ',true],['and would appreciate your feedback.',true]],
        [['Hey, just checking in on the proposal. ',true],['I’d love to hear what you think when you have a chance.',true]]
      ];
      const reduced=typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const [elapsed,setElapsed]=useState(0);
      useEffect(()=>{
        if(reduced)return;
        const startedAt=performance.now();
        const timer=setInterval(()=>setElapsed(performance.now()-startedAt),16);
        return()=>clearInterval(timer);
      },[reduced]);
      const tone=Math.floor(elapsed/3000)%tones.length;
      const phase=elapsed%3000;
      const fullOutput=versions[tone].map(([words])=>words).join('');
      const shownOutput=reduced?fullOutput.length:Math.min(fullOutput.length,Math.floor(phase/850*fullOutput.length));
      let consumed=0;
      const streamed=versions[tone].map(([words,changed],i)=>{
        const visible=words.slice(0,Math.max(0,shownOutput-consumed));
        consumed+=words.length;
        return <span key={i} className={changed&&visible?'tone-highlight':''}>{visible}</span>;
      });
      return <section className="tone-scroll-section pt-4 pb-16 sm:pt-4 sm:pb-24" aria-label="See one draft rewritten in four tones">
        <div className="tone-sticky"><div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[.2em] text-olive">{tones[tone]}</span>
            <h2 className="mt-3 font-display text-3xl font-light text-ink sm:text-5xl">One thought, four ways to say it.</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">Choose a tone: <span className="font-semibold text-olive">{tones[tone]}</span></p>
          </div>
          <div className="tone-stage mt-7 grid gap-3 sm:gap-4">
            <div className="rounded-2xl border hairline bg-white/60 p-5 shadow-card sm:p-7">
              <div className="flex items-center gap-2"><span className="text-xs font-semibold uppercase tracking-[.18em] text-ink/45">Your draft</span><span className="text-ink/20">—</span><span className="text-xs text-ink/45">what you wrote</span></div>
              <p className="mt-3 min-h-[3rem] font-display text-xl leading-relaxed text-ink/70 sm:text-2xl">{draft}</p>
            </div>
            <div className="flex items-center justify-center gap-3 py-1" aria-hidden="true"><span className="h-px w-12 bg-clay/30 sm:w-20" /><svg className="h-5 w-5 text-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="6,13 12,19 18,13" /></svg><span className="text-xs font-medium uppercase tracking-wider text-clay/80">Rewritten</span><span className="h-px w-12 bg-clay/30 sm:w-20" /></div>
            <div className="rounded-2xl border-2 border-clay/20 bg-white p-5 shadow-float sm:p-7">
              <div className="flex items-center"><span className="text-xs font-semibold uppercase tracking-[.18em] text-clay">OrdinaryChat</span></div>
              <p key={tone} className="tone-result mt-3 font-display text-xl leading-relaxed text-ink sm:text-2xl" aria-live="polite">{streamed}{shownOutput<fullOutput.length&&<span className="workflow-caret" />}</p>
              <p className="mt-4 text-sm text-ink/50">Same meaning. Different feel. You decide what fits.</p>
            </div>
          </div>
        </div></div>
      </section>;
    }

    function WorkflowDemo() {
      const ref=useReveal();
      const cycleDuration=4000;
      const typingEnd=880;
      const shortcutEnd=1400;
      const writingEnd=2800;
      const examples=[
        {draft:'great job on this',parts:[['Great work',true],[' on this. ',false],['I especially liked the clear way you explained the idea.',true]]},
        {draft:'can we talk tomorrow',parts:[['Hi, would you be available for a quick chat',true],[' tomorrow?',false]]},
        {draft:'excited to share our new app',parts:[['Excited',true],[' to share our new app. ',false],['It’s built to make everyday work simpler and faster.',true]]}
      ];
      const origin=useRef(0);
      const [elapsed,setElapsed]=useState(0);
      useEffect(()=>{
        const reduced=typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(reduced){setElapsed(writingEnd);return;}
        origin.current=performance.now();
        const timer=setInterval(()=>setElapsed(performance.now()-origin.current),24);
        const onKey=(event)=>{
          const box=ref.current?.getBoundingClientRect();
          if(box&&box.top<window.innerHeight&&box.bottom>0&&event.ctrlKey&&event.key.toLowerCase()==='o'){
            event.preventDefault();origin.current=performance.now()-(Math.floor((performance.now()-origin.current)/cycleDuration)*cycleDuration+typingEnd);
            setElapsed(performance.now()-origin.current);
          }
        };
        window.addEventListener('keydown',onKey);
        return()=>{clearInterval(timer);window.removeEventListener('keydown',onKey)};
      },[]);
      const index=Math.floor(elapsed/cycleDuration)%examples.length;
      const local=elapsed%cycleDuration;
      const example=examples[index];
      const draftCount=local<typingEnd?Math.min(example.draft.length,Math.floor(local/typingEnd*example.draft.length)):example.draft.length;
      const outputLength=example.parts.reduce((total,[part])=>total+part.length,0);
      const outputCount=local<shortcutEnd?0:Math.min(outputLength,Math.floor((local-shortcutEnd)/(writingEnd-shortcutEnd)*outputLength));
      let consumed=0;
      const streamed=example.parts.map(([part,changed],i)=>{
        const portion=part.slice(0,Math.max(0,outputCount-consumed));
        consumed+=part.length;
        return <span key={i} className={changed&&portion?'demo-change':''}>{portion}</span>;
      });
      const finished=outputCount>=outputLength;
      const press=()=>{origin.current=performance.now()-(index*cycleDuration+typingEnd);setElapsed(performance.now()-origin.current)};
      return <section id="how-it-works" ref={ref} className="reveal bg-deep-olive py-14 sm:py-20"><div className="mx-auto grid max-w-8xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16 lg:px-12"><div><span className="text-sm font-semibold uppercase tracking-[.2em] text-mist/65">See it happen</span><h2 className="mt-4 font-display text-3xl font-light text-paper sm:text-5xl">One shortcut. A clearer draft.</h2><p className="mt-5 text-base leading-relaxed text-mist/75">Type naturally. Press Ctrl + O, review the rewrite, and send it yourself.</p></div><div className="rounded-[1.5rem] bg-white p-4 shadow-float sm:p-6"><div className="flex justify-between border-b hairline pb-3"><span className="font-display text-lg">New message</span><span className="text-sm text-ink/40">Example {index+1} of 3</span></div><div className="workflow-editor py-5"><div className={`shortcut-overlay ${local>=typingEnd&&local<shortcutEnd?'show':''}`} aria-hidden="true"><span className="red-dot" /><strong>Ctrl + O</strong><small>Making it clearer</small></div><span className="text-xs font-semibold uppercase tracking-widest text-ink/45">You type</span><p className="mt-2 min-h-[2.5rem] font-display text-lg leading-relaxed text-ink sm:text-xl">{example.draft.slice(0,draftCount)}{local<typingEnd&&<span className="workflow-caret" />}</p><div className="mt-5 border-t hairline pt-4"><span className="text-xs font-semibold uppercase tracking-widest text-clay">OrdinaryChat</span><p className="demo-output mt-2 font-display text-lg leading-relaxed text-ink sm:text-xl">{streamed}{local>=shortcutEnd&&!finished&&<span className="workflow-caret" />}</p></div></div><div className="flex items-center justify-between border-t hairline pt-4"><span className="text-xs text-ink/50">{local<typingEnd?'Typing…':local<shortcutEnd?'Ctrl + O pressed':finished?'Clearer draft ready':'Writing your draft…'}</span><button className={`shortcut-key ${local>=typingEnd&&local<shortcutEnd?'active':''}`} onClick={press} aria-label="Preview Ctrl O rewrite"><kbd>Ctrl</kbd> + <kbd>O</kbd></button></div></div></div></section>;
    }

    function Platforms() {
      const ref = useReveal();
      return (
        <section id="platforms" ref={ref} className="reveal relative overflow-hidden bg-sand/40 py-14 sm:py-20">
          <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[.2em] text-olive">Where it begins</span>
              <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-5xl">One assistant for the way you write.</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">OrdinaryChat is designed for writing across the web.</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-7">
              <div className="rounded-3xl border hairline bg-white p-7 shadow-card sm:p-9">
                <LottieArt file="gmail" className="h-32 w-32" />
                <h3 className="mt-3 font-display text-2xl">Gmail</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/65">Turn rough emails into messages that are easy to read and ready for you to send.</p>
              </div>
              <div className="rounded-3xl border hairline bg-white p-7 shadow-card sm:p-9">
                <LottieArt file="linkedin" className="h-32 w-32" />
                <h3 className="mt-3 font-display text-2xl">LinkedIn</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/65">Shape clearer posts, comments, and replies without sounding like someone else.</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Faq() {
      const items=[
        ['Where will OrdinaryChat work first?','The first release is planned for Gmail and LinkedIn. The longer term idea is one writing assistant for more places you write online.'],
        ['What does Ctrl + O do?','In the planned extension, Ctrl + O refines a draft in the text field. You can review the new wording before you send or post anything.'],
        ['Will OrdinaryChat send or post for me?','No. You decide whether to use a suggestion, and you manually send the email or publish the post.'],
        ['Is OrdinaryChat available now?','It is coming soon. This page previews the planned writing experience.']
      ];
      return <section id="faq" className="py-14 sm:py-20"><div className="mx-auto max-w-4xl px-5 sm:px-8"><h2 className="font-display text-4xl font-light text-ink sm:text-6xl">Good <em className="text-olive">questions.</em></h2><div className="mt-6 border-t hairline">{items.map(([question,answer],i)=><details key={question} className="faq-item" open={i===0}><summary>{question}<span className="faq-logo" aria-hidden="true"><LogoMark /></span></summary><p>{answer}</p></details>)}</div></div></section>;
    }

    function Closing() {
      const ref=useReveal();
      return <section ref={ref} className="reveal relative overflow-hidden py-12 sm:py-16"><div className="marquee-track" aria-hidden="true"><span>{'Thoughts in. Clarity out. '.repeat(6)}</span><span>{'Thoughts in. Clarity out. '.repeat(6)}</span></div><div className="relative mx-auto mt-8 max-w-3xl px-5 text-center"><LottieArt file="wave" className="mx-auto h-28 w-40 overflow-hidden sm:h-36 sm:w-52" /><h2 className="mt-4 font-display text-3xl font-light sm:text-5xl">Write like yourself. Just clearer.</h2></div></section>;
    }

    function Footer() {
      return (
        <footer className="relative border-t hairline bg-paper/60 py-12 sm:py-16">
          <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-0 -ml-1">
                <LogoMark />
                <span className="font-display text-lg lowercase tracking-tight text-ink">rdinarychat</span>
              </div>
              <p className="max-w-md text-sm text-ink/55">An all in one writing assistant. Starting with Gmail and LinkedIn.</p>
            </div>
            <div className="big-wordmark" aria-label="Ordinarychat"><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="10.5" stroke="#10243A" strokeWidth="1.8" /><circle cx="14" cy="14" r="3.4" fill="#D84B47" /></svg><span>rdinarychat</span></div>
            <div className="mt-8 border-t hairline pt-6">
              <p className="text-xs text-ink/45">&copy; 2026 ordinarychat</p>
            </div>
          </div>
        </footer>
      );
    }

    export default function HomePage() {
      return (
        <div className="paper-grain relative min-h-screen bg-paper text-ink">
          <Nav />
          <main className="relative z-10">
            <Hero />
            <RewriteShowcase />
            <WorkflowDemo />
            <Platforms />
            <Faq />
            <Closing />
          </main>
          <Footer />
        </div>
      );
    }
