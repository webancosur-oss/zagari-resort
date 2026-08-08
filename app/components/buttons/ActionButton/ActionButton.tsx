"use client";

import type {
  ComponentType,
  MouseEventHandler,
  ReactNode,
} from "react";

import Link from "next/link";

import styles from "./ActionButton.module.css";

/*==================================================
  TIPOS
==================================================*/

type IconComponent =
  ComponentType<{
    size?: number | string;
    weight?: any;
    "aria-hidden"?: boolean;
  }>;

type ButtonVariant =
  | "primary"
  | "glass"
  | "outline"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

type IconPosition =
  | "left"
  | "right";

type CommonProps = {
  children: ReactNode;

  icon?: IconComponent;

  iconPosition?: IconPosition;

  variant?: ButtonVariant;

  size?: ButtonSize;

  active?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  className?: string;

  ariaLabel?: string;
};

type LinkButtonProps =
  CommonProps & {
    href: string;

    onClick?: never;

    type?: never;
  };

type NativeButtonProps =
  CommonProps & {
    href?: never;

    onClick?:
      MouseEventHandler<HTMLButtonElement>;

    type?:
      | "button"
      | "submit"
      | "reset";
  };

type ActionButtonProps =
  | LinkButtonProps
  | NativeButtonProps;

/*==================================================
  COMPONENTE
==================================================*/

export default function ActionButton({
  children,

  icon:
    Icon,

  iconPosition = "right",

  variant = "primary",

  size = "md",

  active = false,

  disabled = false,

  fullWidth = false,

  className = "",

  ariaLabel,

  ...props
}: ActionButtonProps) {
  const classes = [
    styles.button,

    styles[
      `variant${capitalize(
        variant,
      )}`
    ],

    styles[
      `size${capitalize(
        size,
      )}`
    ],

    active
      ? styles.active
      : "",

    disabled
      ? styles.disabled
      : "",

    fullWidth
      ? styles.fullWidth
      : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon &&
        iconPosition ===
          "left" && (
          <span
            className={
              styles.icon
            }
          >
            <Icon
              size={17}
              weight="bold"
              aria-hidden={
                true
              }
            />
          </span>
        )}

      <span
        className={
          styles.label
        }
      >
        {children}
      </span>

      {Icon &&
        iconPosition ===
          "right" && (
          <span
            className={
              styles.icon
            }
          >
            <Icon
              size={17}
              weight="bold"
              aria-hidden={
                true
              }
            />
          </span>
        )}
    </>
  );

  /*================================================
    LINK
  ================================================*/

  if (
    "href" in props &&
    props.href
  ) {
    return (
      <Link
        href={props.href}
        className={
          classes
        }
        aria-label={
          ariaLabel
        }
        aria-disabled={
          disabled
        }
        tabIndex={
          disabled
            ? -1
            : undefined
        }
      >
        {content}
      </Link>
    );
  }

  /*================================================
    BUTTON
  ================================================*/

  return (
    <button
      type={
        props.type ??
        "button"
      }
      className={
        classes
      }
      onClick={
        props.onClick
      }
      disabled={
        disabled
      }
      aria-label={
        ariaLabel
      }
      aria-pressed={
        active
          ? true
          : undefined
      }
    >
      {content}
    </button>
  );
}

/*==================================================
  UTILIDAD
==================================================*/

function capitalize(
  value: string,
) {
  return (
    value
      .charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}