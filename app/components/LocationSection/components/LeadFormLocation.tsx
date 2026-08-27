"use client";

import {
  FormEvent,
  useState,
} from "react";

import FeedbackToast from "../../FeedbackToast/FeedbackToast";

import styles from "./LeadFormLocation.module.css";

const DB_API_URL =
  "https://ancosur-api-production.up.railway.app/api/formularios";

const CRM_API_URL =
  "/api/leads";

type LeadFormProps = {
  source?: string;
  component?: string;
};

type FormData = {
  fullName: string;
  phone: string;
  dni: string;
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

export default function LeadForm({
  source =
    "Sección ubicación Zagari",

  component =
    "LocationSection - LeadForm",
}: LeadFormProps) {
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
    useState<ToastState>(null);

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

    if (toast) {
      closeToast();
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors =
      {};

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;

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

      const dni =
        formData.dni.replace(
          /\D/g,
          "",
        );

      const utm =
        getUtmParams();

      const project =
        "Zagari Resort Club";

      const propertyType =
        "Lotes";

      const campaign =
        "Formulario web Zagari";

      const announcement =
        "Formulario web Zagari";

      const interest =
        "Lotes Zagari Resort Club";

      const generatedComment =
        "Cliente interesado en Zagari Resort Club. Solicita información sobre lotes, precios y disponibilidad.";

      const dbPayload = {
        nombre:
          fullName,

        telefono:
          phone,

        email:
          "",

        dni:
          dni,

        codigo_formulario:
          "zagari_ubicacion",

        nombre_formulario:
          "Formulario Zagari Web",

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
          component,

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

            dni:
              dni,

            email:
              "",

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

            origen:
              source,

            origen_componente:
              component,

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

      const crmPayload = {
        fuente_id:
          4,

        telefono:
          phone,

        nombre:
          fullName,

        email:
          "",

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
              component,

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
        setIsSending(true);

        setErrors({});

        closeToast();

        console.log(
          "[ZAGARI LOCATION] 1/2 - DB:",
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
          "[ZAGARI LOCATION] Respuesta DB:",
          {
            status:
              dbResponse.status,

            response:
              dbResult,
          },
        );

        if (
          !dbResponse.ok ||
          dbResult?.success ===
            false
        ) {
          console.error(
            "[ZAGARI LOCATION] Error DB:",
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
              `La API respondió con HTTP ${dbResponse.status}.`,
          );

          return;
        }

        console.log(
          "[ZAGARI LOCATION] 2/2 - CRM:",
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
          "[ZAGARI LOCATION] Respuesta CRM:",
          {
            status:
              crmResponse.status,

            response:
              crmResult,
          },
        );

        if (
          !crmResponse.ok ||
          crmResult?.success ===
            false
        ) {
          console.error(
            "[ZAGARI LOCATION] DB OK / CRM ERROR:",
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
          "[ZAGARI LOCATION] Error:",
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
        <input
          type="text"
          name="website"
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
          htmlFor="zagari-location-name"
        >
          Nombre
        </label>

        <input
          id="zagari-location-name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
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
          styles.field
        }
      >
        <label
          htmlFor="zagari-location-phone"
        >
          WhatsApp
        </label>

        <input
          id="zagari-location-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="999 999 999"
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
      </div>

      <div
        className={
          styles.field
        }
      >
        <label
          htmlFor="zagari-location-dni"
        >
          DNI
          <span>
            opcional
          </span>
        </label>

        <input
          id="zagari-location-dni"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="12345678"
          maxLength={8}
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
      </div>

      <label
        className={
          styles.privacyConsent
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
          Acepto el tratamiento de
          mis datos personales de
          acuerdo con la{" "}

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

      <button
        type="submit"
        disabled={
          isSending
        }
        className={
          styles.submit
        }
      >
        {isSending ? (
          "Enviando..."
        ) : (
          <>
            Quiero conocer Zagari

            <span
              aria-hidden="true"
            >
              →
            </span>
          </>
        )}
      </button>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
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
  );
}