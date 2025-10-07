import translate from 'translate';
translate.engine = 'libre';
translate.key = ''; 

export async function translateText(text, target = 'ar') {
  if (!text) return '';
  try {
    const translation = await translate(text, { to: target });
    return translation;
  } catch (err) {
    console.error('Translation error:', err);
    return text; 
  }
}
