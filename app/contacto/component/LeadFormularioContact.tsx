"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowRight,
  Check,
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react";

import Link from "next/link";


import styles from "./LeadFormularioContact.module.css";
import FeedbackToast from "@/app/components/FeedbackToast/FeedbackToast";


const DB_API_URL =
  "https://ancosur-api-production.up.railway.app/api/formularios";


type FormData = {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  consent: boolean;
  website: string;
};


type FormErrors = Partial<
  Record<
    keyof FormData,
    string
  >
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


const interests = [
  "Lotes",
  "Cabañas",
  "Resort Club",
  "Amenidades",
  "Inversión",
  "Visita al proyecto",
];


const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  interest: "Lotes",
  message: "",
  consent: true,
  website: "",
};


const SUCCESS_TITLE =
  "¡Solicitud enviada correctamente!";


const SUCCESS_MESSAGE =
  "Hemos recibido tus datos. Un asesor de Zagari Resort Club se comunicará contigo para brindarte información.";


const DEFAULT_MESSAGE =
  "Cliente interesado en Zagari Resort Club. Solicita información sobre lotes, precios y disponibilidad.";


export default function LeadFormularioContact() {
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
    useState<FormErrors>(
      {},
    );


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
      !formData.interest.trim()
    ) {
      newErrors.interest =
        "Selecciona una opción.";
    }


    if (
      formData.message.trim()
        .length > 250
    ) {
      newErrors.message =
        "El mensaje no debe superar los 250 caracteres.";
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


  const readApiResponse =
    async (
      response: Response,
    ) => {

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
    };


  const getUtmParams = () => {
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
  };


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


      const fullName =
        formData.fullName.trim();


      const phone =
        formData.phone.replace(
          /\D/g,
          "",
        );


      const email =
        formData.email
          .trim()
          .toLowerCase();


      const interest =
        formData.interest.trim();


      const cleanMessage =
        formData.message.trim();


      const utm =
        getUtmParams();


      const generatedMessage =
        cleanMessage ||
        DEFAULT_MESSAGE;


      const dbPayload = {
        nombre:
          fullName,

        telefono:
          phone,

        email:
          email,

        dni:
          "",

        codigo_formulario:
          "zagari_contacto",

        nombre_formulario:
          "Formulario Contacto Zagari",

        tipo_formulario:
          "contacto",

        proyecto:
          "Zagari Resort Club",

        proyecto_interes:
          "Zagari Resort Club",

        tipo_inmueble:
          interest,

        categoria_interes:
          interest,

        interes:
          interest,

        mensaje:
          generatedMessage,

        horario_visita:
          "",

        campaña:
          "Formulario web Zagari",

        anuncio:
          "Formulario web Zagari",

        fuente_id:
          4,

        fuente_descripcion:
          "PAGINA WEB",

        fuente_prospeccion:
          "Web",

        origen_ruta:
          window.location.pathname,

        origen_componente:
          "LeadFormularioContact",

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
              "",

            interes:
              interest,

            mensaje:
              generatedMessage,

            proyecto:
              "Zagari Resort Club",

            tipo_inmueble:
              interest,

            campaña:
              "Formulario web Zagari",

            anuncio:
              "Formulario web Zagari",

            formulario:
              "Formulario Contacto Zagari",

            origen:
              "Contacto Zagari",

            origen_componente:
              "LeadFormularioContact",

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


      try {

        setIsSending(
          true,
        );

        setErrors({});

        closeToast();


        console.log(
          "[ZAGARI CONTACTO] Enviando únicamente a DB:",
          dbPayload,
        );


        const response =
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


        const result =
          await readApiResponse(
            response,
          );


        console.log(
          "[ZAGARI CONTACTO] Respuesta DB:",
          {
            status:
              response.status,

            response:
              result,
          },
        );


        if (
          !response.ok ||
          result?.success ===
            false
        ) {

          console.error(
            "[ZAGARI CONTACTO] Error DB:",
            {
              status:
                response.status,

              response:
                result,

              payload:
                dbPayload,
            },
          );


          showToast(
            "error",

            "No pudimos guardar tu solicitud",

            result?.message ||
              `La API respondió con HTTP ${response.status}.`,
          );


          return;
        }


        setFormData(
          initialFormData,
        );


        setErrors({});


        showToast(
          "success",

          SUCCESS_TITLE,

          SUCCESS_MESSAGE,
        );

      } catch (
        error
      ) {

        console.error(
          "[ZAGARI CONTACTO] Error:",
          error,
        );


        showToast(
          "error",

          "No pudimos enviar tus datos",

          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado. Inténtalo nuevamente.",
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
      <div
        className={
          styles.formHeader
        }
      >
        <div>
          <span
            className={
              styles.formEyebrow
            }
          >
            Hablemos
          </span>

          <h2>
            Cuéntanos qué
            estás buscando.
          </h2>
        </div>
      </div>


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


        <div
          className={
            styles.field
          }
        >
          <label
            htmlFor="contact-name"
          >
            Nombre completo
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
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
        </div>


        <div
          className={
            styles.fieldRow
          }
        >
          <div
            className={
              styles.field
            }
          >
            <label
              htmlFor="contact-phone"
            >
              Teléfono
            </label>

            <div
              className={
                styles.inputWithIcon
              }
            >
              <Phone
                size={17}
                weight="regular"
              />

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="999 999 999"
                autoComplete="tel"
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
            </div>

            {errors.phone && (
              <small
                className={
                  styles.error
                }
              >
                {errors.phone}
              </small>
            )}
          </div>


          <div
            className={
              styles.field
            }
          >
            <label
              htmlFor="contact-email"
            >
              Correo
            </label>

            <div
              className={
                styles.inputWithIcon
              }
            >
              <EnvelopeSimple
                size={17}
                weight="regular"
              />

              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="correo@email.com"
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
            </div>

            {errors.email && (
              <small
                className={
                  styles.error
                }
              >
                {errors.email}
              </small>
            )}
          </div>
        </div>


        <fieldset
          className={
            styles.interestField
          }
        >
          <legend>
            ¿Qué te interesa?
          </legend>

          <div
            className={
              styles.interests
            }
          >
            {interests.map(
              (
                interestItem,
              ) => {
                const active =
                  formData.interest ===
                  interestItem;

                return (
                  <button
                    key={
                      interestItem
                    }
                    type="button"
                    className={`${styles.interestButton} ${
                      active
                        ? styles.interestButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      updateField(
                        "interest",
                        interestItem,
                      )
                    }
                  >
                    <span>
                      {
                        interestItem
                      }
                    </span>

                    {active && (
                      <Check
                        size={13}
                        weight="bold"
                      />
                    )}
                  </button>
                );
              },
            )}
          </div>
        </fieldset>


        <div
          className={
            styles.field
          }
        >
          <label
            htmlFor="contact-message"
          >
            Cuéntanos un poco más
            <span>
              Opcional
            </span>
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows={4}
            maxLength={250}
            placeholder="Me gustaría recibir información sobre..."
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
        </div>


        <label
          className={
            styles.privacy
          }
        >
          <input
            type="checkbox"
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
              styles.customCheckbox
            }
          >
            <Check
              size={11}
              weight="bold"
            />
          </span>

          <span>
            Acepto el tratamiento
            de mis datos de acuerdo
            con la{" "}

            <Link
              href="/politicas/politica-de-privacidad"
            >
              política de privacidad
            </Link>
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


        <button
          type="submit"
          className={
            styles.submitButton
          }
          disabled={
            isSending
          }
        >
          <span>
            {isSending
              ? "Enviando..."
              : "Solicitar información"}
          </span>

          <span
            className={
              styles.submitIcon
            }
          >
            <ArrowRight
              size={17}
              weight="bold"
            />
          </span>
        </button>


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