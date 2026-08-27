"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  PaperPlaneTilt,
} from "@phosphor-icons/react";

import styles from "./LeadForm.module.css";

import FeedbackToast from "../../FeedbackToast/FeedbackToast";


const DB_API_URL =
  "https://ancosur-api-production.up.railway.app/api/formularios";

const CRM_API_URL =
  "/api/leads";


type FormData = {
  fullName: string;
  phone: string;
  dni: string;
  email: string;
  message: string;
  consent: boolean;
  website: string;
};


type FormErrors = Partial<
  Record<keyof FormData, string>
>;


type ToastVariant =
  | "success"
  | "error"
  | "info"
  | "warning";


type ToastState = {
  id: number;
  variant: ToastVariant;
  title: string;
  message: string;
} | null;


const initialFormData: FormData = {
  fullName: "",
  phone: "",
  dni: "",
  email: "",
  message: "",
  consent: true,
  website: "",
};


const SUCCESS_TITLE =
  "¡Datos enviados correctamente!";


const SUCCESS_MESSAGE =
  "Tu solicitud fue registrada correctamente. Un asesor de Zagari Resort Club se comunicará contigo.";


const ERROR_TITLE =
  "No pudimos enviar tus datos";


const ERROR_MESSAGE =
  "Ocurrió un problema al registrar tu solicitud. Inténtalo nuevamente.";


const DEFAULT_COMMENT =
  "Cliente interesado en Zagari Resort Club. Solicita información sobre lotes, precios y disponibilidad.";


/* =========================================================
   GOOGLE TAG
   DEJADO COMENTADO
========================================================= */

// declare global {
//   interface Window {
//     gtag?: (
//       command: "event",
//       eventName: string,
//       params?: Record<string, unknown>,
//     ) => void;
//   }
// }


// function sendGoogleTagEvent(
//   data: FormData,
// ) {
//   if (
//     typeof window ===
//     "undefined"
//   ) {
//     return;
//   }

//   if (
//     typeof window.gtag !==
//     "function"
//   ) {
//     return;
//   }

//   window.gtag(
//     "event",
//     "generate_lead",
//     {
//       event_category:
//         "lead",

//       event_label:
//         "Zagari Web",

//       lead_source:
//         "Zagari Web",

//       project:
//         "Zagari Resort Club",

//       interest:
//         "Lotes Zagari Resort Club",

//       page_path:
//         window.location.pathname,
//     },
//   );
// }


/* =========================================================
   LEER RESPUESTA API
========================================================= */

async function readApiResponse(
  response: Response,
) {
  const contentType =
    response.headers.get(
      "content-type",
    ) || "";


  if (
    contentType.includes(
      "application/json",
    )
  ) {
    try {
      return await response.json();
    } catch {
      return {
        success: false,
        message:
          "La API devolvió una respuesta JSON inválida.",
      };
    }
  }


  const text =
    await response.text();


  return {
    success:
      response.ok,

    message:
      text || undefined,
  };
}


/* =========================================================
   UTM
========================================================= */

function getUtmParams() {
  if (
    typeof window ===
    "undefined"
  ) {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };
  }


  const params =
    new URLSearchParams(
      window.location.search,
    );


  return {
    utm_source:
      params.get(
        "utm_source",
      ) || "",

    utm_medium:
      params.get(
        "utm_medium",
      ) || "",

    utm_campaign:
      params.get(
        "utm_campaign",
      ) || "",

    utm_content:
      params.get(
        "utm_content",
      ) || "",

    utm_term:
      params.get(
        "utm_term",
      ) || "",
  };
}


/* =========================================================
   COMPONENTE
========================================================= */

export default function LeadForm() {
  const [
    formData,
    setFormData,
  ] =
    useState<FormData>(
      initialFormData,
    );


  const [
    errors,
    setErrors,
  ] =
    useState<FormErrors>({});


  const [
    isSending,
    setIsSending,
  ] =
    useState(false);


  const [
    toast,
    setToast,
  ] =
    useState<ToastState>(
      null,
    );


  /* =======================================================
     TOAST
  ======================================================= */

  const closeToast = () => {
    setToast(null);
  };


  const showToast = (
    variant: ToastVariant,
    title: string,
    message: string,
  ) => {
    setToast({
      id:
        Date.now(),

      variant,

      title,

      message,
    });
  };


  /* =======================================================
     CAMPO
  ======================================================= */

  const updateField = <
    K extends keyof FormData
  >(
    field: K,
    value: FormData[K],
  ) => {
    setFormData(
      (current) => ({
        ...current,

        [field]:
          value,
      }),
    );


    setErrors(
      (current) => ({
        ...current,

        [field]:
          undefined,
      }),
    );


    closeToast();
  };


  /* =======================================================
     VALIDACIÓN
  ======================================================= */

  const validateForm = () => {
    const newErrors:
      FormErrors = {};


    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    const phoneClean =
      formData.phone.replace(
        /\D/g,
        "",
      );


    const dniClean =
      formData.dni.replace(
        /\D/g,
        "",
      );


    if (
      !formData.fullName.trim()
    ) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";

    } else if (
      !nameRegex.test(
        formData.fullName.trim(),
      )
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }


    if (
      !formData.phone.trim()
    ) {
      newErrors.phone =
        "Ingresa tu número de celular.";

    } else if (
      !/^9\d{8}$/.test(
        phoneClean,
      )
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }


    if (
      dniClean &&
      !/^\d{8}$/.test(
        dniClean,
      )
    ) {
      newErrors.dni =
        "El DNI debe tener 8 dígitos.";
    }


    if (
      !formData.email.trim()
    ) {
      newErrors.email =
        "Ingresa tu correo electrónico.";

    } else if (
      !emailRegex.test(
        formData.email.trim(),
      )
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
    }


    if (
      formData.message.trim()
        .length > 250
    ) {
      newErrors.message =
        "El comentario no debe superar los 250 caracteres.";
    }


    if (
      !formData.consent
    ) {
      newErrors.consent =
        "Debes aceptar el tratamiento de tus datos personales.";
    }


    setErrors(
      newErrors,
    );


    return (
      Object.keys(
        newErrors,
      ).length === 0
    );
  };


  /* =======================================================
     HANDLE SUBMIT
  ======================================================= */

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>,
    ) => {

      event.preventDefault();
      event.stopPropagation();


      if (isSending) {
        return;
      }


      if (
        formData.website.trim()
      ) {
        return;
      }


      if (
        !validateForm()
      ) {
        return;
      }


      /* ===================================================
         DATOS LIMPIOS
      =================================================== */

      const fullName =
        formData.fullName.trim();


      const phone =
        formData.phone.replace(
          /\D/g,
          "",
        );


      const dni =
        formData.dni.replace(
          /\D/g,
          "",
        );


      const email =
        formData.email
          .trim()
          .toLowerCase();


      const cleanMessage =
        formData.message.trim();


      const utm =
        getUtmParams();


      /* ===================================================
         CONFIGURACIÓN ZAGARI
      =================================================== */

      const project =
        "Zagari Resort Club";


      const propertyType =
        "Lotes";


      const campaign =
        "Formulario web Zagari";


      const announcement =
        "Formulario web Zagari";


      const formName =
        "Formulario Zagari Web";


      const componentSource =
        "LeadForm - Zagari Web";


      const interest =
        "Lotes Zagari Resort Club";


      const generatedComment =
        cleanMessage ||
        DEFAULT_COMMENT;


      /* ===================================================
         PAYLOAD DB
         
         Este payload es EXCLUSIVO para tu API
         de formularios.
         
         NO se reutiliza para CRM.
      =================================================== */

      const dbPayload = {
        nombre:
          fullName,

        telefono:
          phone,

        email:
          email,

        dni:
          dni,

        codigo_formulario:
          "zagari_web",

        nombre_formulario:
          formName,

        tipo_formulario:
          "lotes",

        proyecto:
          project,

        proyecto_interes:
          project,

        tipo_inmueble:
          propertyType,

        categoria_interes:
          propertyType,

        interes:
          interest,

        mensaje:
          generatedComment,

        horario_visita:
          "",

        campaña:
          campaign,

        anuncio:
          announcement,

        fuente_id:
          4,

        fuente_descripcion:
          "PAGINA WEB",

        fuente_prospeccion:
          "Web",

        origen_ruta:
          window.location.pathname,

        origen_componente:
          componentSource,

        ruta_pagina:
          window.location.pathname,

        url_pagina:
          window.location.href,

        pagina_referencia:
          document.referrer || "",

        utm_source:
          utm.utm_source,

        utm_medium:
          utm.utm_medium,

        utm_campaign:
          utm.utm_campaign,

        utm_content:
          utm.utm_content,

        utm_term:
          utm.utm_term,

        estado_crm:
          "pendiente",

        datos_originales:
          JSON.stringify({
            nombre:
              fullName,

            telefono:
              phone,

            email:
              email,

            dni:
              dni,

            comentario:
              generatedComment,

            interes:
              interest,

            proyecto:
              project,

            tipo_inmueble:
              propertyType,

            campaña:
              campaign,

            anuncio:
              announcement,

            nombre_formulario:
              formName,

            origen:
              "Zagari Web",

            origen_componente:
              componentSource,

            consentimiento:
              formData.consent,

            ruta:
              window.location.pathname,

            url:
              window.location.href,

            referrer:
              document.referrer || "",

            utm,
          }),
      };


      /* ===================================================
         PAYLOAD CRM
         
         IMPORTANTE:
         NO contiene:
           id
           id_crm
           lead_id
           crm_lead_id
           id_formulario
           id_registro
           ni ningún ID de la DB.
         
         El CRM generará su propio ID
         cuando reciba este request.
      =================================================== */

      const crmPayload = {
        fuente_id:
          4,

        telefono:
          phone,

        nombre:
          fullName,

        email:
          email,

        dni:
          dni,

        campaña:
          campaign,

        anuncio:
          announcement,

        msj_client:
          JSON.stringify({
            interes:
              interest,

            mensaje:
              generatedComment,

            origen_ruta:
              window.location.pathname,

            origen_componente:
              componentSource,

            campaña:
              campaign,

            proyecto:
              project,

            tipo_inmueble:
              propertyType,

            consentimiento:
              formData.consent,
          }),

        comentario:
          generatedComment,
      };


      try {

        setIsSending(
          true,
        );

        setErrors({});

        closeToast();


        /* =================================================
           1. DB
        ================================================= */

        console.log(
          "[ZAGARI] 1/2 - Guardando en DB:",
          dbPayload,
        );


        const dbResponse =
          await fetch(
            DB_API_URL,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  dbPayload,
                ),
            },
          );


        const dbResult =
          await readApiResponse(
            dbResponse,
          );


        console.log(
          "[ZAGARI] Respuesta DB:",
          {
            status:
              dbResponse.status,

            response:
              dbResult,
          },
        );


        /* =================================================
           ERROR DB
        ================================================= */

        if (
          !dbResponse.ok ||
          dbResult?.success ===
            false
        ) {

          console.error(
            "[ZAGARI] Error DB:",
            {
              status:
                dbResponse.status,

              response:
                dbResult,

              payload:
                dbPayload,
            },
          );


          showToast(
            "error",

            "No pudimos guardar tu solicitud",

            dbResult?.message ||
              `La API de formularios respondió con HTTP ${dbResponse.status}.`,
          );


          return;
        }


        /* =================================================
           2. CRM
           
           IMPORTANTE:
           No usamos ningún dato ID de dbResult.
           El CRM recibe solamente crmPayload.
        ================================================= */

        console.log(
          "[ZAGARI] 2/2 - Enviando al CRM:",
          crmPayload,
        );


        const crmResponse =
          await fetch(
            CRM_API_URL,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  crmPayload,
                ),
            },
          );


        const crmResult =
          await readApiResponse(
            crmResponse,
          );


        console.log(
          "[ZAGARI] Respuesta CRM:",
          {
            status:
              crmResponse.status,

            response:
              crmResult,
          },
        );


        /* =================================================
           ERROR CRM
        ================================================= */

        if (
          !crmResponse.ok ||
          crmResult?.success ===
            false
        ) {

          console.error(
            "[ZAGARI] DB OK / CRM ERROR:",
            {
              status:
                crmResponse.status,

              response:
                crmResult,

              payload:
                crmPayload,
            },
          );


          showToast(
            "error",

            "Solicitud registrada, pero pendiente de CRM",

            crmResult?.message ||
              `El CRM respondió con HTTP ${crmResponse.status}.`,
          );


          return;
        }


        /* =================================================
           GOOGLE TAG
           
           COMENTADO
        ================================================= */

        // sendGoogleTagEvent(
        //   formData,
        // );


        /* =================================================
           RESET
        ================================================= */

        setFormData(
          initialFormData,
        );


        setErrors({});


        /* =================================================
           ÉXITO
        ================================================= */

        showToast(
          "success",

          SUCCESS_TITLE,

          SUCCESS_MESSAGE,
        );

      } catch (
        error
      ) {

        console.error(
          "[ZAGARI] Error enviando formulario:",
          error,
        );


        showToast(
          "error",

          ERROR_TITLE,

          error instanceof Error
            ? error.message
            : ERROR_MESSAGE,
        );

      } finally {

        setIsSending(
          false,
        );
      }
    };


  return (
    <div
      className={
        styles.wrapper
      }
    >

      <header
        className={
          styles.formHeading
        }
      >
        <span>
          Conversemos
        </span>

        <p>
          Déjanos tus datos para
          recibir información
          comercial.
        </p>
      </header>


      <form
        className={
          styles.form
        }
        onSubmit={
          handleSubmit
        }
        method="post"
        noValidate
      >

        <div
          className={
            styles.honeypot
          }
          aria-hidden="true"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={
              formData.website
            }
            onChange={(event) =>
              updateField(
                "website",
                event.target.value,
              )
            }
          />
        </div>


        <label
          className={
            styles.field
          }
        >
          <span>
            Nombre completo
          </span>

          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            autoComplete="name"
            value={
              formData.fullName
            }
            onChange={(event) =>
              updateField(
                "fullName",
                event.target.value,
              )
            }
            aria-invalid={
              Boolean(
                errors.fullName,
              )
            }
          />

          {errors.fullName && (
            <small
              className={
                styles.error
              }
            >
              {
                errors.fullName
              }
            </small>
          )}
        </label>


        <div
          className={
            styles.formRow
          }
        >

          <label
            className={
              styles.field
            }
          >
            <span>
              Celular
            </span>

            <input
              type="tel"
              name="phone"
              placeholder="987 654 321"
              autoComplete="tel"
              inputMode="numeric"
              maxLength={9}
              value={
                formData.phone
              }
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value.replace(
                    /\D/g,
                    "",
                  ),
                )
              }
              aria-invalid={
                Boolean(
                  errors.phone,
                )
              }
            />

            {errors.phone && (
              <small
                className={
                  styles.error
                }
              >
                {errors.phone}
              </small>
            )}
          </label>


          <label
            className={
              styles.field
            }
          >
            <span>
              DNI
              <em>
                Opcional
              </em>
            </span>

            <input
              type="text"
              name="dni"
              placeholder="12345678"
              inputMode="numeric"
              maxLength={8}
              autoComplete="off"
              value={
                formData.dni
              }
              onChange={(event) =>
                updateField(
                  "dni",
                  event.target.value.replace(
                    /\D/g,
                    "",
                  ),
                )
              }
              aria-invalid={
                Boolean(
                  errors.dni,
                )
              }
            />

            {errors.dni && (
              <small
                className={
                  styles.error
                }
              >
                {errors.dni}
              </small>
            )}
          </label>

        </div>


        <label
          className={
            styles.field
          }
        >
          <span>
            Correo
          </span>

          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            autoComplete="email"
            value={
              formData.email
            }
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
            aria-invalid={
              Boolean(
                errors.email,
              )
            }
          />

          {errors.email && (
            <small
              className={
                styles.error
              }
            >
              {
                errors.email
              }
            </small>
          )}
        </label>


        <label
          className={
            styles.field
          }
        >
          <span>
            Comentario
            <em>
              Opcional
            </em>
          </span>

          <textarea
            name="message"
            rows={3}
            maxLength={250}
            placeholder="Cuéntanos qué información necesitas..."
            value={
              formData.message
            }
            onChange={(event) =>
              updateField(
                "message",
                event.target.value,
              )
            }
            aria-invalid={
              Boolean(
                errors.message,
              )
            }
          />

          {errors.message && (
            <small
              className={
                styles.error
              }
            >
              {
                errors.message
              }
            </small>
          )}
        </label>


        <label
          className={
            styles.privacyConsent
          }
        >

          <input
            type="checkbox"
            name="privacy"
            checked={
              formData.consent
            }
            onChange={(event) =>
              updateField(
                "consent",
                event.target.checked,
              )
            }
          />

          <span
            className={
              styles.privacyCheckbox
            }
            aria-hidden="true"
          >
            {formData.consent
              ? "✓"
              : ""}
          </span>

          <span
            className={
              styles.privacyText
            }
          >
            Acepto el tratamiento
            de mis datos personales
            de acuerdo con la{" "}

            <a
              href="/politicas/politica-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de
              Privacidad
            </a>
            .
          </span>

        </label>


        {errors.consent && (
          <small
            className={
              styles.error
            }
          >
            {
              errors.consent
            }
          </small>
        )}


        <div
          className={
            styles.formFooter
          }
        >

          <button
            type="submit"
            className={
              styles.submitButton
            }
            disabled={
              isSending
            }
          >

            {isSending ? (
              <>
                <span
                  className={
                    styles.spinner
                  }
                />

                Enviando...
              </>
            ) : (
              <>
                <PaperPlaneTilt
                  size={14}
                  weight="fill"
                />

                Solicitar
                información
              </>
            )}

          </button>

          <small>
            Nuestro equipo te
            contactará para
            orientarte.
          </small>

        </div>


        <FeedbackToast
          key={toast?.id}
          open={
            toast !== null
          }
          variant={
            toast?.variant ??
            "info"
          }
          title={
            toast?.title ??
            ""
          }
          message={
            toast?.message ??
            ""
          }
          onClose={
            closeToast
          }
        />

      </form>
    </div>
  );
}