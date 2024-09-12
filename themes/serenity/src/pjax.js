import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/photoswipe.css';

import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css';
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';

import barba from '@barba/core';
import { gsap } from 'gsap';

const lightbox = new PhotoSwipeLightbox({
    gallery: ".pswp-gallery",
    children: "a",
    pswpModule: () => import('photoswipe')
});

window.addEventListener("load", () => {
    const gallerySelector = "article p:has(img)";
    const galleries = document.querySelectorAll(gallerySelector);
    galleries.forEach(gallery => {
        gallery.classList.add("pswp-gallery");
        const imgs = gallery.childNodes;
        const ratios = [];
        let smallestRatio = Infinity;
        imgs.forEach(img => {
            if (img.nodeName !== "IMG") return;
            const { naturalWidth: width, naturalHeight: height } = img;
            const ratio = width / height;
            ratios.push(ratio);
            if (smallestRatio > ratio) smallestRatio = ratio;
            const a = document.createElement("a");
            a.href = img.getAttribute("src");
            a.target = "_blank";
            a.setAttribute("data-pswp-width", width);
            a.setAttribute("data-pswp-height", height);
            a.appendChild(img.cloneNode());
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = img.getAttribute("alt");
            const figure = document.createElement("figure");
            figure.append(a, figcaption);
            img.replaceWith(figure);
        });
        const columnsString = ratios.map(ratio => `${ratio / smallestRatio}fr`).join(" ");
        gallery.style.setProperty("grid-template-columns", columnsString);
    });
    lightbox.init();
});

const replaceHeadTags = target => {
    const head = document.head;
    const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
    const newPageHead = document.createElement('head');
    newPageHead.innerHTML = targetHead;
    const removeHeadTags = [
        "meta[name='keywords']",
        "meta[name='description']",
        "meta[property^='fb']",
        "meta[property^='og']",
        "meta[name^='twitter']",
        "meta[name='robots']",
        'meta[itemprop]',
        'link[itemprop]',
        "link[rel='prev']",
        "link[rel='next']",
        "link[rel='canonical']"
    ].join(',');
    const headTags = [...head.querySelectorAll(removeHeadTags)];
    headTags.forEach(item => {
        head.removeChild(item);
    });
    const newHeadTags = [...newPageHead.querySelectorAll(removeHeadTags)];
    newHeadTags.forEach(item => {
        head.appendChild(item);
    });
};

barba.init({
    transitions: [{
        leave({ current, next, trigger }) {
            return gsap.to(gsap.from(current.container.querySelector("aside"), {
                x: 300,
                opacity: 0,
                duration: 1
            }).querySelector("main"), {
                y: 100,
                opacity: 0,
                duration: 1
            });
        },
        enter({ current, next, trigger }) {
            replaceHeadTags(next);

            return gsap.from(gsap.from(next.container.querySelector("aside"), {
                x: 300,
                opacity: 0,
                duration: 1
            }).querySelector("main"), {
                y: 100,
                opacity: 0,
                duration: 1
            });
        }
    }]
});

window.addEventListener('DOMContentLoaded', () => {
    gsap.from("aside", {
        x: 300,
        opacity: 0,
        duration: 1
    });

    gsap.from("main", {
        y: 100,
        opacity: 0,
        duration: 1
    });
});
