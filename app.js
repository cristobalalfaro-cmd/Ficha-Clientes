// Web App URL fija (Apps Script)
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzh2dd7Ig7Od0oiBjM3WW7TYlQUEnvnNLlOczPGk0Kt9L8sR30vitigGyotZSvPNDUAsw/exec";

const $ = sel => document.querySelector(sel);

function getFormData(){
  const data = {
    empresa: $('#empresa').value.trim(),
    cliente: $('#cliente').value.trim(),
    cargo: $('#cargo').value.trim(),
    motivo: $('#motivo').value.trim(),
    fecha: $('#fecha').value,
    asistentes: $('#asistentes').value.trim(),
    tema1: $('#tema1').value.trim(),
    tema2: $('#tema2').value.trim(),
    tema3: $('#tema3').value.trim(),
    comp1: $('#comp1').value.trim(),
    comp1_fecha: $('#comp1_fecha').value,
    comp1_owner: $('#comp1_owner').value.trim(),
    comp2: $('#comp2').value.trim(),
    comp2_fecha: $('#comp2_fecha').value,
    comp2_owner: $('#comp2_owner').value.trim(),
    comp3: $('#comp3').value.trim(),
    comp3_fecha: $('#comp3_fecha').value,
    comp3_owner: $('#comp3_owner').value.trim()
  };
  return data;
}

function validate(data){
  if(!data.empresa) return 'Ingresa el nombre de la empresa.';
  if(!data.cliente) return 'Ingresa el nombre del cliente.';
  if(!data.fecha) return 'Selecciona la fecha de la reunión.';
  return null;
}

async function saveMeeting(){
  const data = getFormData();
  const err = validate(data);
  if (err) return setStatus(err, true);

  setStatus('Guardando...');

  try {
    // 1) Rellenar el formulario oculto con los valores
    const form = document.getElementById('gasForm');
    Object.entries(data).forEach(([k, v]) => {
      const input = form.querySelector(`[name="${k}"]`);
      if (input) input.value = v ?? '';
    });

    // 2) Escuchar la carga del iframe (respuesta del servidor)
    const iframe = document.getElementById('gas_iframe');

    const onLoad = () => {
      iframe.removeEventListener('load', onLoad);
      setStatus('✅ Reunión guardada en Google Sheets.');
      clearForm();
    };

    iframe.addEventListener('load', onLoad);

    // 3) Enviar el form (POST cross-domain sin CORS)
    form.submit();

  } catch (e) {
    setStatus('❌ No se pudo guardar: ' + e.message, true);
  }
}

function setStatus(msg, isError=false){
  const el = $('#status');
  el.textContent = msg;
  el.style.color = isError ? 'var(--danger)' : 'var(--muted)';
}

function clearForm(){
  ['empresa','cliente','cargo','motivo','fecha','asistentes',
   'tema1','tema2','tema3','comp1','comp1_fecha','comp1_owner',
   'comp2','comp2_fecha','comp2_owner','comp3','comp3_fecha','comp3_owner'
  ].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
}

function init(){
  document.getElementById('btnGuardar').addEventListener('click', saveMeeting);
}

document.addEventListener('DOMContentLoaded', init);
