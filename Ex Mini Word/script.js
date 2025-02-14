const textColor = document.getElementById('textColor');
const fontSize = document.getElementById('fontSize');
const fontFamily = document.getElementById('fontFamily');
const editableText = document.getElementById('editableText');

function updateTextStyle() {
    editableText.style.color = textColor.value;
    editableText.style.fontSize = `${fontSize.value}px`;
    editableText.style.fontFamily = fontFamily.value;
}

textColor.addEventListener('input', updateTextStyle);
fontSize.addEventListener('input', updateTextStyle);
fontFamily.addEventListener('change', updateTextStyle);

updateTextStyle();