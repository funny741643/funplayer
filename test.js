const rename = (target) => {
    return target
        .replace(/^nplayer/i, "NPlayer")
        .replace(/-([A-Za-z])/g, (_, c) => c.toUpperCase());
};

console.log(rename("nplayer-react"));
