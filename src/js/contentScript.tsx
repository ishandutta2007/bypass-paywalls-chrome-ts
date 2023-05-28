if (!matchDomain(['seekingalpha.com', 'sfchronicle.com', 'cen.acs.org', 'elmundo.es', 'scmp.com'])) {
  window.localStorage.clear();
}
if (matchDomain('elmercurio.com')) {
  if (window.location.href.toLowerCase().includes('/inversiones/')) {
    document.addEventListener('DOMContentLoaded', () => {
      const paywall = document.querySelector('#modal_limit_articulos');
      const body = document.querySelector('body');
      removeDOMElement(paywall);
      if (body.hasAttribute('class')) {
        body.removeAttribute('class');
      }
    });
  }
} else if (matchDomain('estadao.com.br')) {
  setTimeout(function() {
    const paywall = document.querySelector('#paywall-wrapper-iframe-estadao');
    const body = document.querySelector('html');
    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('rep.repubblica.it')) {
  window.setTimeout(function() {
    if (window.location.href.includes('/pwa/')) {
      window.location.href = window.location.href.replace('/pwa/', '/ws/detail/');
    }
  }, 500);
  if (window.location.href.includes('/ws/detail/')) {
    const paywall = document.querySelector('.paywall');
    if (paywall) {
      ampUnhideSubscriptionsSection();
    }
  }
} else if (matchDomain('americanbanker.com')) {
  const inlineGate = document.querySelector('.inline-gate');
  if (inlineGate) {
    inlineGate.classList.remove('inline-gate');
    const inlineGated = document.querySelectorAll('.inline-gated');
    for (const elem of inlineGated) {
      elem.classList.remove('inline-gated');
    }
  }
} else if (matchDomain('telegraaf.nl')) {
  if (window.location.href.startsWith('https://www.telegraaf.nl/error?ref=/')) {
    window.location.href = window.location.href.split('&')[0].replace('error?ref=/', '');
  }
  const articleWrapper = document.querySelector('.ArticlePageWrapper__uid');
  const spotXBanner = document.querySelector('.ArticleBodyBlocks__inlineArticleSpotXBanner');
  const paywall = document.querySelector('.PopupBackdrop__block');
  removeDOMElement(spotXBanner, paywall);
  const premium = document.querySelector('.PremiumLabelWithLine__body');
  const articleId = articleWrapper ? articleWrapper.innerText : '123';
  const articleBodyDone = document.querySelector('#articleBody' + articleId);
  if (premium && !articleBodyDone) {
    const articleBodyOld = document.querySelector('[id^=articleBody]');
    removeDOMElement(articleBodyOld);
    const json = document.querySelector('script[type="application/ld+json"][data-react-helmet="true"]');
    if (json) {
      const jsonText = JSON.parse(json.text).articleBody;
      const articleBody = document.querySelector('section.TextArticlePage__bodyText');
      if (articleBody) {
        const divMain = document.createElement('div');
        divMain.setAttribute('id', 'articleBody' + articleId);
        const divElem = document.createElement('div');
        divElem.setAttribute('data-element', 'articleBodyBlocks');
        const textArray = jsonText.split('\n\n');
        textArray.forEach(pText => {
          const pDiv = document.createElement('p');
          pDiv.setAttribute('class', 'ArticleBodyBlocks__paragraph ArticleBodyBlocks__paragraph--nieuws');
          pDiv.innerText = pText;
          divElem.appendChild(pDiv);
        });
        divMain.appendChild(divElem);
        articleBody.appendChild(divMain);
      }
    }
  }
} else if (matchDomain('washingtonpost.com')) {
  const leaderboard = document.querySelector('#leaderboard-wrapper');
  const adverts = document.querySelectorAll('div[data-qa="article-body-ad"]');
  const softwall = document.querySelector('[id^="softwall"]');
  removeDOMElement(leaderboard, softwall, ...adverts);
  if (window.location.href.includes('/gdpr-consent/')) {
    const freeButton = document.querySelector('.gdpr-consent-container .continue-btn.button.free');
    if (freeButton) {
      freeButton.click();
    }
    window.setTimeout(function() {
      const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
      if (gdprcheckbox) {
        gdprcheckbox.checked = true;
        gdprcheckbox.dispatchEvent(new Event('change'));
        document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
      }
    }, 300); // Delay (in milliseconds)
  } else {
    const url = window.location.href;
    function main(element) {
      removeDOMElement(element);
      window.location.href = url.split('?')[0] + '?outputType=amp';
    }
    if (!url.includes('outputType=amp')) {
      waitDOMElement('div[id^="paywall-"]', 'DIV', main, false);
    } else {
      const subscriptionsSections = document.querySelectorAll('[subscriptions-section="content"]');
      for (const subscriptionsSection of subscriptionsSections) {
        subscriptionsSection.removeAttribute('subscriptions-section');
      }
    }
  }
} else if (matchDomain('wsj.com') && !matchDomain('cn.wsj.com')) {
  if (window.location.href.includes('/articles/')) {
    const closeButton = document.querySelector('div.close-btn[role="button"]');
    if (closeButton) {
      closeButton.click();
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    const snippet = document.querySelector('.snippet-promotion');
    const wsjPro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
    if (snippet || wsjPro) {
      if (!window.location.hash) {
        if (url.includes('?')) {
          window.location.href = url.replace('?', '#refreshed?');
        } else {
          window.location.href = url + '#refreshed';
        }
      } else {
        window.location.href = window.location.href.replace('wsj.com', 'wsj.com/amp').replace('#refreshed', '');
      }
    }
  });
} else if (matchDomain('sloanreview.mit.edu')) {
  const readMore = document.querySelector('.btn-read-more');
  if (readMore) {
    readMore.click();
  }
} else if (matchDomain('mexiconewsdaily.com')) {
  window.setTimeout(function() {
    const popup = document.querySelector('div.pigeon-widget-prompt');
    const cproOverlay = document.querySelector('.cpro-overlay');
    removeDOMElement(popup, cproOverlay);
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('the-american-interest.com')) {
  const counter = document.getElementById('article-counter');
  removeDOMElement(counter);
} else if (matchDomain('nzherald.co.nz')) {
  const articleContent = document.querySelector('.article__content');
  if (articleContent) {
    const articleOffer = document.querySelector('.article-offer');
    if (articleOffer) {
      const cssSelector = articleContent.querySelectorAll('p')[5].getAttribute('class');
      const hiddenNotPars = articleContent.querySelectorAll('.' + cssSelector + ':not(p)');
      for (const hiddenNotPar of hiddenNotPars) {
        hiddenNotPar.classList.remove(cssSelector);
        hiddenNotPar.removeAttribute('style');
      }
      const hiddenPars = articleContent.querySelectorAll('p.' + cssSelector);
      const parser = new DOMParser();
      for (const hiddenPar of hiddenPars) {
        const parHtml = parser.parseFromString('<div style="margin: 10px 0px; font-size: 17px">' + hiddenPar.innerHTML + '</div>', 'text/html');
        const parDom = parHtml.querySelector('div');
        articleContent.insertBefore(parDom, hiddenPar);
      }
      const firstSpan = document.querySelector('p > span');
      if (firstSpan) {
        firstSpan.removeAttribute('class');
      }
      removeDOMElement(articleOffer);
    }
  }
  const premiumToaster = document.querySelector('#premium-toaster');
  removeDOMElement(premiumToaster);
} else if (matchDomain('interest.co.nz')) {
  const wrapper = document.getElementById('pp-ablock-banner-wrapper');
  const overlay = document.querySelector('.black-overlay');
  removeDOMElement(overlay, wrapper);
} else if (matchDomain('stuff.co.nz')) {
  const overlay = document.querySelector('.x0');
  removeDOMElement(overlay);
} else if (matchDomain('thenational.scot')) {
  const overlay = document.querySelector('.template-container');
  removeDOMElement(overlay);
} else if (matchDomain('thestar.com')) {
  setTimeout(function() {
    const paywall = document.querySelector('.basic-paywall-new');
    removeDOMElement(paywall);
    const tbc = document.querySelectorAll('.text-block-container');
    for (const el of tbc) {
      el.removeAttribute('style');
    }
  }, 1000); // Delay (in milliseconds)
} else if (matchDomain('afr.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const hiddenImage = document.querySelectorAll('img');
    for (const image of hiddenImage) {
      const src = image.src;
      if ('src: ' + src.indexOf('.gif') !== -1) {
        const dataSrc = image.getAttribute('data-src');
        if (dataSrc) {
          image.setAttribute('src', dataSrc);
        }
      }
    }
    const plista = document.querySelector('div[data-plista-placement="underArticle_Group"]');
    removeDOMElement(plista);
  });
} else if (matchDomain(['parool.nl', 'trouw.nl', 'volkskrant.nl', 'demorgen.be', 'humo.be'])) {
  document.addEventListener('DOMContentLoaded', () => {
    const topBanner = document.querySelector('div[data-temptation-position="PAGE_TOP"]');
    const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
    const hiddenSection = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
    const overlay = document.querySelector('div[data-temptation-position="PAGE_BOTTOM"]');
    removeDOMElement(topBanner, paywall, hiddenSection, overlay);
  });
} else if (matchDomain('firstthings.com')) {
  const paywall = document.getElementsByClassName('paywall')[0];
  removeDOMElement(paywall);
} else if (matchDomain('bloomberg.com')) {
  blockElement('#graphics-paywall-overlay', true);
} else if (matchDomain('bloombergquint.com')) {
  const articlesLeftModal = document.getElementsByClassName('paywall-meter-module__story-paywall-container__1UgCE')[0];
  const paywall = document.getElementById('paywallDmp');
  removeDOMElement(articlesLeftModal, paywall);
} else if (matchDomain('medium.com') || document.querySelector('script[src^="https://cdn-client.medium.com/"]')) {
  const paywall = document.querySelector('div#paywall-background-color');
  removeDOMElement(paywall);
  if (paywall) {
    extensionApi.runtime.sendMessage({ request: 'refreshCurrentTab' });
  }
  window.setTimeout(function() {
    const meter = document.querySelector('[id*="highlight-meter-"]');
    if (meter) {
      meter.hidden = true;
    }
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('theglobeandmail.com')) {
  const articleBodySubscribed = document.querySelector('.c-article-body--subscribed');
  if (articleBodySubscribed) {
    articleBodySubscribed.removeAttribute('class');
  }
} else if (matchDomain(['examiner.com.au', 'thecourier.com.au', 'theadvocate.com.au'])) {
  const subscribeTruncate = document.querySelector('.subscribe-truncate');
  if (subscribeTruncate) {
    subscribeTruncate.classList.remove('subscribe-truncate');
  }
  const subscriberHider = document.querySelectorAll('.subscriber-hider');
  for (const el of subscriberHider) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('canberratimes.com.au')) {
  const paywall = document.querySelector('.subscribe-article.news-article-body.article__body');
  paywall.classList.remove('subscribe-article');
  const subscribe = document.getElementsByClassName('subscriber-container')[0];
  removeDOMElement(subscribe);
  const content = document.getElementsByClassName('subscriber-hider');
  for (const el of content) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('ledevoir.com')) {
  const counter = document.querySelector('.full.hidden-print.popup-msg');
  removeDOMElement(counter);
} else if (matchDomain('ft.com')) {
  const cookieBanner = document.querySelector('.o-banner__outer');
  const ribbon = document.querySelector('.js-article-ribbon');
  const ads = document.querySelector('.o-ads');
  removeDOMElement(cookieBanner, ads, ribbon);
} else if (matchDomain('thehindu.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#test');
    const coBanner = document.querySelector('.co-banner');
    const support = document.querySelector('div.support-jlm');
    removeDOMElement(counter, coBanner, support);
  });
} else if (matchDomain('nytimes.com')) {
  const banners = document.querySelectorAll('div[data-testid="inline-message"], div[id^="ad-"], div.expanded-dock');
  removeDOMElement(...banners);
} else if (matchDomain('technologyreview.com')) {
  window.setTimeout(function() {
    const bodyObscured = document.querySelector('body[class*="body__obscureContent"]');
    if (bodyObscured) {
      removeClassesByPrefix(bodyObscured, 'body__obscureContent');
    }
    const overlay = document.querySelector('div[class*="overlayFooter__wrapper"]');
    if (overlay) {
      overlay.setAttribute('style', 'display:none');
    }
    const contentBodyHidden = document.querySelector('div[class*="contentBody__contentHidden"]');
    if (contentBodyHidden) {
      removeClassesByPrefix(contentBodyHidden, 'contentBody__contentHidden');
    }
    const contentBodyOverlay = document.querySelector('div[class*="contentBody__overlay"]');
    if (contentBodyOverlay) {
      contentBodyOverlay.removeAttribute('class');
    }
  }, 500);
} else if (matchDomain('leparisien.fr')) {
  window.removeEventListener('scroll', this.scrollListener);
  const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
  removeDOMElement(paywall);
  setTimeout(function() {
    const content = document.getElementsByClassName('content');
    for (const el of content) {
      el.removeAttribute('style');
    }
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('caixinglobal.com')) {
  const payTips = document.querySelectorAll('.cons-pay-tip');
  for (const payTip of payTips) {
    payTip.removeAttribute('style');
  }
  const appContent = document.getElementById('appContent');
  if (appContent) {
    const pHidden = document.querySelectorAll('p:not([style="display:block;"]');
    for (const el of pHidden) {
      el.setAttribute('style', 'display:block;');
    }
  }
} else if (matchDomain('bizjournals.com')) {
  const sheetOverlay = document.querySelector('.sheet-overlay');
  const chunkPaywall = document.querySelector('.chunk--paywall');
  removeDOMElement(sheetOverlay, chunkPaywall);
  const overlaid = document.querySelectorAll('.is-overlaid');
  for (const el of overlaid) {
    el.classList.remove('is-overlaid');
  }
  const bodyHidden = document.querySelector('.js-pre-chunks__story-body');
  bodyHidden.removeAttribute('style');
} else if (matchDomain('the-tls.co.uk')) {
  const paywall = document.querySelector('.tls-subscriptions-banner__closed-skin');
  removeDOMElement(paywall);
} else if (matchDomain('cen.acs.org')) {
  const paywall = document.querySelector('.meteredBar');
  removeDOMElement(paywall);
} else if (matchDomain('elperiodico.com')) {
  setTimeout(function() {
    const unavailableArea = document.querySelector('.closed');
    const infoBox = document.querySelector('.ep-masPeriodico-info');
    if (unavailableArea) {
      unavailableArea.classList.remove('closed');
    }
    if (infoBox) {
      infoBox.parentNode.removeChild(infoBox);
    }
  }, 1000);
} else if (matchDomain('techinasia.com')) {
  const paywall = document.querySelector('.paywall-content');
  if (paywall) {
    paywall.classList.remove('paywall-content');
  }
  const splashSubscribe = document.querySelector('.splash-subscribe');
  const paywallHard = document.querySelector('.paywall-hard');
  removeDOMElement(splashSubscribe, paywallHard);
} else if (matchDomain('thewrap.com')) {
  const embed = document.querySelector('.embed');
  if (embed) {
    // Display feature video
    const container = document.querySelector('.featured-image-container');
    removeDOMElement(container);
    embed.classList.remove('d-none');
  }
} else if (matchDomain('hbr.org')) {
  const banner = document.querySelector('.persistent-banner');
  removeDOMElement(banner);
} else if (matchDomain('spectator.co.uk')) {
  const banner = document.querySelector('#subscribe-ribbon');
  removeDOMElement(banner);
} else if (matchDomain('barrons.com')) {
  const url = window.location.href;
  if (!url.includes('barrons.com/amp/')) {
    const bodyContinuous = document.querySelector('body.is-continuous');
    const snippet = document.querySelector('meta[content="snippet"]');
    if (bodyContinuous && snippet) {
      removeDOMElement(snippet);
      window.location.href = url.replace('barrons.com', 'barrons.com/amp');
    }
    const signinLinks = document.querySelectorAll('a.primary-button--link[href*="target="]');
    for (const signinLink of signinLinks) {
      signinLink.href = decodeURIComponent(signinLink.href.split('target=')[1]).split('?')[0];
      signinLink.text = 'Click';
    }
    const barronsAds = document.querySelectorAll('.barrons-body-ad-placement');
    removeDOMElement(...barronsAds);
  } else {
    const preview = document.querySelector('section[subscriptions-section="content-not-granted"]');
    removeDOMElement(preview);
    const subscrSection = document.querySelector('section[subscriptions-section="content"]');
    if (subscrSection) {
      subscrSection.removeAttribute('subscriptions-section');
    }
  }
  removeDOMElement(document.querySelector('.login-section-container'));
} else if (matchDomain('nzz.ch')) {
  const paywall = document.querySelector('.dynamic-regwall');
  removeDOMElement(paywall);
} else if (matchDomain('irishtimes.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const stubArticleMsg = document.querySelector('div.stub-article-msg');
    const url = window.location.href;
    if (url.includes('mode=sample') || stubArticleMsg) {
      window.location.href = new URL(url).pathname + '?mode=amp';
    }
  });
} else if (matchDomain('thesaturdaypaper.com.au')) {
  const paywall = document.querySelector('div.paywall-hard-always-show');
  removeDOMElement(paywall);
} else if (matchDomain('lesechos.fr') && window.location.href.match(/-\d{6,}/)) {
  window.setTimeout(function() {
    const aboBanner = document.querySelector('[class^="pgxf3b"]');
    const adBlocks = document.querySelectorAll('[class*="jzxvkd"');
    for (const adBlock of adBlocks) {
      adBlock.setAttribute('style', 'display:none');
    }
    if (aboBanner) {
      removeDOMElement(aboBanner);
      const url = window.location.href;
      const html = document.documentElement.outerHTML;
      let state;
      const split1 = html.split('window.__PRELOADED_STATE__=')[1];
      const split2 = split1.split('</script>')[0].trim();
      if (split2.includes('; window.__DATA__=')) {
        state = split2.split('; window.__DATA__=')[0].trim();
      } else {
        state = split2.substr(0, split2.length - 1);
      }
      try {
        const data = JSON.parse(state);
        const article = data.article.data.stripes[0].mainContent[0].data.description;
        const urlLoaded = data.article.data.path;
        if (!url.includes(urlLoaded)) {
          window.location.reload(true);
        }
        const paywallNode = document.querySelector('.post-paywall');
        if (paywallNode) {
          const contentNode = document.createElement('div');
          const parser = new DOMParser();
          const articleHtml = parser.parseFromString('<div>' + article + '</div>', 'text/html');
          const articlePar = articleHtml.querySelector('div');
          if (articlePar) {
            contentNode.appendChild(articlePar);
            contentNode.className = paywallNode.className;
            paywallNode.parentNode.insertBefore(contentNode, paywallNode);
            removeDOMElement(paywallNode);
            const paywallLastChildNode = document.querySelector('.post-paywall  > :last-child');
            if (paywallLastChildNode) {
              paywallLastChildNode.setAttribute('style', 'height: auto !important; overflow: hidden !important; max-height: none !important;');
            }
          }
        }
        const styleElem = document.head.appendChild(document.createElement('style'));
        styleElem.innerHTML = '.post-paywall::after {height: auto !important;}';
      } catch (err) {
        window.location.reload(true);
      }
    }
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('startribune.com')) {
  // remove active class from all elements
  document.querySelectorAll('div.ReactModalPortal').forEach(function(el) {
    removeDOMElement(el);
  });
  // Enable Scroll. Reveal Hiddlen Paragraph
  document.getElementsByTagName('body')[0].removeAttribute('class');
} else if (matchDomain('seattletimes.com')) {
  window.setTimeout(function() {
    // remove modal class from all elements
    document.querySelectorAll('div.modal').forEach(function(el) {
      removeDOMElement(el);
    });
    // Remove Blurred Style from all matching Divs
    document.getElementById('container').removeAttribute('style');
    document.querySelectorAll('div[style~="filter"]').forEach(function(el) {
      el.removeAttribute('style');
    });
    document.querySelectorAll('div[class~="NewsletterSignupSplash"]').forEach(function(el) {
      el.removeAttribute('class');
    });
  }, 1000); // Delay (in milliseconds)
} else if (matchDomain('theatlantic.com')) {
  // Remove all nudge elements
  document.querySelectorAll('div[class*="c-nudge"]').forEach(function(el) {
    removeDOMElement(el);
  });
  // Remove all FancyBox ads
  document.querySelectorAll('div[class*="fancybox"]').forEach(function(el) {
    removeDOMElement(el);
  });
} else if (matchDomain('theathletic.com')) {
  if (!window.location.search.match(/(\?|&)amp/)) {
    const paywall = document.querySelector('div#slideup-paywall');
    if (paywall) {
      const overlays = document.querySelectorAll('div[id*="overlay"], div:empty:not([data-rjs])');
      removeDOMElement(paywall, ...overlays);
      const body = document.querySelector('body');
      if (body) {
        body.style.overflow = 'visible';
        body.style.position = 'relative';
      }
    } else {
      const headlinePaywall = document.querySelectorAll('a.headline-paywall');
      const amphtml = document.querySelector('link[rel="amphtml"]');
      if (headlinePaywall.length && amphtml) {
        removeDOMElement(...headlinePaywall);
        window.setTimeout(function() {
          window.location.href = amphtml.href;
        }, 1000);
      }
    }
  } else {
    ampUnhideSubscriptionsSection();
  }
  const apron = document.querySelector('div#free-apron-cta, div.slideup-free-apron-container');
  removeDOMElement(apron);
} else if (matchDomain('newyorker.com')) {
  blockElement('.paywall-bar', true);
  blockElement('.paywall-modal');
} else if (matchDomain('vanityfair.com')) {
  const paywall = document.querySelector('.paywall-bar');
  removeDOMElement(paywall);
} else if (matchDomain(['postimees.ee', 'elu24.ee'])) {
  setTimeout(function() {
    // Remove 'adblocker-detected' footer notification
    const adblockNotif = document.querySelector('.ad-block-notification-overlay');
    removeDOMElement(adblockNotif);
    document.body.removeAttribute('style');
  }, 800); // Delay (in milliseconds)
} else if (matchDomain('theolivepress.es')) {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const paywall = document.querySelector('.ev-open-modal-paywall-REQUIRE_LOGIN_WITH_ENTITLEMENT');
  removeDOMElement(modalBackdrop, paywall);
  for (const clazz of ['ev-modals', 'modal-open']) {
    document.body.classList.remove(clazz);
  }
} else if (matchDomain('themarker.com')) {
  setTimeout(function() {
    const paywall = document.querySelector('[data-test="bottomStrip"]');
    const notifications = document.querySelector('#pwSubscribePopup');
    const banner = document.querySelector('#themarker\\.com\\.billboard\\.desktop');
    const newsBanner = document.querySelector('#themarker\\.com\\.news\\.banner');
    const midBanner = document.querySelector('#themarker\\.com.headline\\.banner\\.desktop');
    const financeBanner = document.querySelector('#themarker\\.com\\.finance\\.banner');
    const topStrip = document.querySelector('[data-test="topStrip"]');
    const otherBanners = Array.from(document.querySelectorAll('[data-audtarget]'));
    removeDOMElement(paywall, notifications, banner, topStrip, midBanner, newsBanner, financeBanner, ...otherBanners);
  }, 500);
} else if (matchDomain('haaretz.co.il')) {
  setTimeout(function() {
    const notifications = document.querySelector('#pwSubscribePopup');
    const paywall = document.querySelector('[data-test="bottomStrip"]');
    const banner = document.querySelector('#haaretz\\.co\\.il\\.billboard\\.desktop');
    const editorsBanner = document.querySelector('#haaretz\\.co\\.il\\.editors\\.banner');
    const headlinesBanner = document.querySelector('#haaretz\\.co\\.il\\.headline\\.box\\.desktop');
    const topStrip = document.querySelector('[data-test="topStrip"]');
    const otherBanners = Array.from(document.querySelectorAll('[data-audtarget]'));
    removeDOMElement(paywall, notifications, banner, editorsBanner, topStrip, headlinesBanner, ...otherBanners);
  }, 500);
} else if (matchDomain('sueddeutsche.de')) {
  const url = window.location.href;
  document.addEventListener('DOMContentLoaded', () => {
    const offerPage = document.querySelector('div.offer-page');
    if (url.startsWith('https://www.sueddeutsche.de') && (url.includes('reduced=true') || offerPage)) {
      window.location.href = url.split('?')[0].replace('www.', 'amphtml.');
    } else if (url.startsWith('https://sz-magazin.sueddeutsche.de')) {
      if (url.includes('reduced=true') || offerPage) {
        window.location.href = new URL(url).pathname + '!amp';
      }
    }
  });
  window.setTimeout(function() {
    if (url.includes('!amp')) {
      const paragraphReduced = document.querySelector('.paragraph--reduced');
      if (paragraphReduced) {
        paragraphReduced.classList.remove('paragraph--reduced');
      }
      const paragraphHidden = document.querySelectorAll('.paragraph--hidden');
      for (const parHidden of paragraphHidden) {
        parHidden.classList.remove('paragraph--hidden');
      }
      const paragraphDynamic = document.querySelector('.paragraph--dynamic');
      if (paragraphDynamic) {
        paragraphDynamic.classList.remove('paragraph--dynamic');
      }
      const ampOfferpage = document.querySelector('.amp-offerpage');
      removeDOMElement(ampOfferpage);
    }
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('adweek.com')) {
  const bodySingle = document.querySelector('body.single');
  const ampHtml = document.querySelector('link[rel="amphtml"]');
  if (bodySingle && ampHtml) {
    bodySingle.classList.remove('single');
    window.location.href = ampHtml.href;
  }
} else if (matchDomain('gelocal.it')) {
  if (!window.location.href.includes('/amp/')) {
    const paywallAdagio = document.querySelector('.paywall-adagio');
    removeDOMElement(paywallAdagio);
  } else {
    const paywall = document.querySelector('div[amp-access="showContent"]');
    if (paywall) {
      paywall.removeAttribute('amp-access-hide');
    }
    const ampAds = document.querySelectorAll('amp-ad');
    removeDOMElement(...ampAds);
  }
} else if (matchDomain('elmundo.es')) {
  const premium = document.querySelector('.ue-c-article__premium');
  const url = window.location.href;
  if (!url.includes('/amp.' + 'elmundo.es' + '/')) {
    if (premium) {
      removeDOMElement(premium);
      window.location.href = window.location.href.replace('/www.', '/amp.');
    }
  } else {
    const paywall = document.querySelector('div[amp-access="authorized!=true"]');
    if (paywall) {
      removeDOMElement(paywall);
      const divHidden = document.querySelector('div[amp-access="authorized=true"]');
      if (divHidden) {
        divHidden.removeAttribute('amp-access-hide');
      }
    }
    const advertising = document.querySelectorAll('.advertising, amp-embed');
    removeDOMElement(...advertising);
  }
} else if (matchDomain('speld.nl')) {
  const paywallPopup = document.querySelector('.c-paywall-notice');
  removeDOMElement(paywallPopup);
} else if (matchDomain('lastampa.it')) {
  const url = window.location.href;
  if (!url.includes('/amp/')) {
    const premium = document.querySelector('.paywall-adagio');
    removeDOMElement(premium);
    window.setTimeout(function() {
      if (premium) {
        window.location.href = url.split('?')[0] + '/amp/';
      }
      const articleBody = document.querySelector('div#article-body[style]');
      if (articleBody) {
        articleBody.removeAttribute('style');
      }
    }, 500);
  } else {
    const paywall = document.querySelector('div[id^="paywall-banner"]');
    removeDOMElement(paywall);
    const subscriptionSection = document.querySelector('[subscriptions-section="content"]');
    if (subscriptionSection) {
      subscriptionSection.removeAttribute('subscriptions-section');
      const preview = document.querySelector('div[subscriptions-section="content-not-granted"]');
      removeDOMElement(preview);
    }
    const ampAds = document.querySelectorAll('amp-ad, amp-embed');
    removeDOMElement(...ampAds);
  }
} else if (matchDomain('time.com')) {
  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('style', 'position:relative !important;');
  }
} else if (matchDomain('expansion.com')) {
  const premium = document.querySelector('.ue-c-article__premium');
  const url = window.location.href;
  if (!url.includes('/amp.' + 'expansion.com' + '/')) {
    if (premium) {
      removeDOMElement(premium);
      window.location.href = window.location.href.replace('/www.', '/amp.');
    }
  } else {
    const paywall = document.querySelector('div[amp-access="authorized!=true"]');
    if (paywall) {
      removeDOMElement(paywall);
      const divHidden = document.querySelector('div[amp-access="authorized=true"]');
      if (divHidden) {
        divHidden.removeAttribute('amp-access-hide');
      }
    }
    const advertising = document.querySelectorAll('.advertising, amp-embed');
    removeDOMElement(...advertising);
  }
} else if (matchDomain('chicagobusiness.com')) {
  const body = document.querySelector('body[class]');
  if (body) {
    body.removeAttribute('class');
  }
} else if (matchDomain('latimes.com')) {
  const paywall = document.querySelector('metering-modal');
  const incognitoWall = document.querySelector('metering-toppanel');
  if (paywall) {
    removeDOMElement(paywall);
  } else if (incognitoWall) {
    removeDOMElement(incognitoWall);
  }
  if (paywall || incognitoWall) {
    document.body.removeAttribute('style');
  }
} else if (matchDomain('foreignpolicy.com')) {
  const contentUngated = document.querySelector('div.content-ungated');
  removeDOMElement(contentUngated);
  const contentGated = document.querySelector('div.content-gated');
  if (contentGated) {
    contentGated.classList.remove('content-gated');
  }
} else if (matchDomain('bostonglobe.com')) {
  // Remove the portion covering the paywall
  const paywall = document.querySelector('div.meter-paywall');
  if (paywall) {
    removeDOMElement(paywall);
  }
  // Re-enable scrolling
  const body = document.querySelector('body');
  if (body) {
    document.body.removeAttribute('style');
  }
  // Click the button to reveal the rest of the article
  const buttonDiv = document.querySelector('[id="continue_button"]');
  if (buttonDiv) {
    const button = buttonDiv.querySelector('button');
    if (button) {
      button.click();
    }
  }
} else if (matchDomain('nationalgeographic.com')) {
  // prevent modal from showing up, then remove scroll-locking, and article blur
  new window.MutationObserver(function(mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof window.HTMLElement) {
          if (node.matches('#fittPortal_0')) {
            removeDOMElement(node);
            const body = document.body;
            body.removeAttribute('class');
            body.removeAttribute('style');
            body.removeAttribute('overflow');
            const blur = document.querySelector('#natgeo-template1-frame-1-module-1 > div > div > section > article > section > div.Article__Content__Overlay--gated');
            if (blur) removeDOMElement(blur);
            this.disconnect(); // Stop watching for element being added after one removal
          }
        }
      }
    }
  }).observe(document, { subtree: true, childList: true });
} else if (matchDomain('hbrchina.org')) {
  const hiddenDiv = document.querySelector('div#the_content');
  if (hiddenDiv) {
    hiddenDiv.removeAttribute('style');
  }
} else if (matchDomain('scmp.com')) {
  if (window.location.href.includes('/amp.')) {
    const divHidden = document.querySelectorAll('div.article-body[amp-access][amp-access-hide]');
    for (const elem of divHidden) {
      elem.removeAttribute('amp-access-hide');
    }
    const defaultMeters = document.querySelectorAll('div.default-meter, div#archive-article-meter');
    const ads = document.querySelectorAll('amp-ad, div.ad-banner, div.advert-fly-carpet-container, div.inline-advert');
    removeDOMElement(...defaultMeters, ...ads);
  }
} else if (matchDomain('fortune.com')) {
  const paywalledArticle = document.querySelector('.paywall.paywallActive');
  if (paywalledArticle) {
    for (const clazz of ['paywall', 'paywallActive']) {
      paywalledArticle.classList.remove(clazz);
    }
  }
}
function matchDomain(domains) {
  const hostname = window.location.hostname;
  if (typeof domains === 'string') {
    domains = [domains];
  }
  return domains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
}
function waitDOMElement(selector, tagName = '', callback, multiple = false) {
  new window.MutationObserver(function(mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!tagName || node.tagName === tagName) {
          if (node.matches(selector)) {
            callback(node);
            if (!multiple) {
              this.disconnect();
            }
          }
        }
      }
    }
  }).observe(document, {
    subtree: true,
    childList: true
  });
}
function removeDOMElement(...elements) {
  for (const element of elements) {
    if (element) {
      element.remove();
    }
  }
}
function removeClassesByPrefix(el, prefix) {
  for (const clazz of el.classList) {
    if (clazz.startsWith(prefix)) {
      el.classList.remove(clazz);
    }
  }
}
// Prevent element from being added the first time to the DOM
function blockElement(selector, blockAlways = false) {
  new window.MutationObserver(function(mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof window.HTMLElement) {
          if (node.matches(selector)) {
            removeDOMElement(node);
            if (!blockAlways) {
              this.disconnect(); // Stop watching for element being added after one removal
            }
          }
        }
      }
    }
  }).observe(document, { subtree: true, childList: true });
}
function ampUnhideSubscriptionsSection(ampAdsSel = 'amp-ad, .ad') {
  const preview = document.querySelector('[subscriptions-section="content-not-granted"]');
  removeDOMElement(preview);
  const subscriptionsSection = document.querySelectorAll('[subscriptions-section="content"]');
  for (const elem of subscriptionsSection) {
    elem.removeAttribute('subscriptions-section');
  }
  const ampAds = document.querySelectorAll(ampAdsSel);
  removeDOMElement(...ampAds);
}
