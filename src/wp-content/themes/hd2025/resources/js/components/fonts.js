import FontFaceObserver from 'fontfaceobserver';

document.addEventListener('DOMContentLoaded', () => {
    const fonts = [
        { family: 'Roboto', weights: [ 400, 700 ] },
        { family: 'Open Sans', weights: [ 300, 600 ] },
    ];

    const fontObservers = fonts.flatMap(font =>
        font.weights.map(weight => new FontFaceObserver(font.family, { weight }).load()),
    );

    Promise.all(fontObservers)
        .then(() => {
            document.documentElement.classList.add('font-loaded');
        })
        .catch(err => {
        });
});
