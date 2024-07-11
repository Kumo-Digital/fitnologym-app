import { useState } from "react";
import classes from "./body-model.module.css";

interface FemaleBodyOutlinesProps {
  onSectionSelect: (section: string) => void;
  props?: any;
}

export const FemaleBodyOutlines = ({
  onSectionSelect,
}: FemaleBodyOutlinesProps) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    onSectionSelect(section);
  };

  return (
    <svg
      className={classes.outlines}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 541.867 541.867"
      xmlSpace="preserve"
      onClick={(e) => {
        const target = e.target as SVGElement;
        if (["torso", "arms", "legs"].includes(target.id)) {
          handleSectionSelect(target.id);
        } else {
          handleSectionSelect("overview");
        }
      }}
    >
      <g>
        <path
          id="arms"
          className={selectedSection === "arms" ? classes.active : ""}
          strokeWidth="2"
          d="M263.574 113.659c-.655 0-1.276.083-1.845.266-5.232 1.68-7.721 8.096-8.563 13.527-.607 3.92.773 9.751 3.6 12.534 2.939 2.895 5.62 2.48 9.741 2.296 4.353-.196 11.206-3.172 14.334-6.205.605-.587-2.313-9.413-4.654-14.458-1.759-3.792-8.026-7.956-12.613-7.96zm-73.023 1.985a.213.213 0 00-.056.018c-4.531 2.101-10.179 4.071-13.183 8.062-2.722 3.615-3.148 7.13-4.811 11.298-1.573 3.94-2.452 5.97-5.088 11.666-.446.961 8.59 1.023 12.596-.962.879-.435.303-6.617.992-8.842 2.43-7.849 10.564-21.406 9.55-21.24zm92.018 23.933c-.98.032-2.254 2.367-5.972 4.513-7.662 4.421-14.648 1.597-14.024 2.433 8.758 11.734 18.095 26.368 27.362 39.513 1.126 1.596-1.377-3.785 4.914-9.039 6.097-5.09 12.727-3.164 12.11-3.905-7.424-8.91-15.65-19.13-23.43-32.688-.34-.593-.634-.838-.96-.827zm-115.672 10.56c-.85.004-1.427.085-1.505.273-4.542 11.091-10.381 18.343-16.651 25.797-.84 1 2.999-1.19 9.521 3.204 6.684 4.503 5.908 10.04 7.064 8.555 4.714-6.054 7.551-9.46 12.264-15.076.678-.808-2.315-6.517-3.454-10.596-.787-2.82.883-7.824 2.003-10.431.317-.74-6.206-1.735-9.242-1.725zm142.053 26.276c-2.31.004-8.767 1.74-11.48 4.154-2.378 2.117-4.347 8.197-3.97 8.687 6.999 9.115 15.107 15.1 32.142 39.092.427.602-.815-1.495 1.799-3.785 5.47-4.792 9.558 1.614 8.749.186-5.617-9.914-8.253-17.932-13.03-26.558-4.105-7.41-8.33-14.809-13.404-21.593-.093-.125-.379-.184-.806-.183zm-162.358 3.532c-1.065-.01-1.922.177-2.386.622-9.31 8.93-16.05 23.25-21.718 30.901-5.67 7.651-6.764 9.658-10.86 14.52-.56.666.702 3.46 2.42 4.81 1.72 1.35 6.037 3.296 7.199 1.892 4.774-5.77 12.914-14.425 21.47-20.54 8.555-6.113 11.374-7.476 19.731-19.049 1.868-2.586-3.428-8.17-6.7-10.3-2.353-1.53-6.434-2.833-9.156-2.856z"
        ></path>
        <path
          id="legs"
          className={selectedSection === "legs" ? classes.active : ""}
          strokeWidth="2"
          d="M262.902 238.862c-3.51-.155-15.194 6.453-21.406 10.97-9.427 6.856-18.138 32.186-17.902 33.785 1.88 12.737 2.981 18.227 5.88 24.834 6.063 13.824 11.626 26.4 19.166 44.046 3.254 7.615 9.47 15.858 10.945 23.064.723 3.53 1.757 8.116 5.077 9.52 2.942 1.243 7.747.117 10.223-1.9 5.02-4.093 6.752-12.04 6.296-18.502-2.039-28.91.023-40.344-2.046-55.46-2.237-16.35-5.681-27.016-7.683-36.951-2.506-12.442-3.647-22.94-7.585-32.9-.129-.324-.463-.484-.965-.506zm-84.764 11.628c-4.675 19.718-5.966 33.108-5.44 49.8.673 21.398 8.085 42.089 10.53 63.358.73 6.348-1.46 14.273 3.027 18.823 2.637 2.674 5.886 2.414 9.434 1.184 4.89-1.695 11.122-7.956 11.407-10.53.432-3.899 2.609-10.21 3.014-14.956.747-8.743.557-15.726.93-23.161.626-12.422 5.188-23.744 6.411-36.122.46-4.658 1.177-9.904.746-14.392-4.235-.798-13.1-3.895-17.813-8.204-6.036-5.519-6.396-14.069-12.418-20.754-3.284-3.646-5.67-4.153-9.828-5.046zm108.141 128.192c-.89.137-3.373 8.44-15.123 11.993-5.692 1.722-10.045-4.731-9.477-1.58 2.168 12.05 4.591 20.574 6.581 29.135 3.226 13.875 7.798 23.928 9.39 38.084.523 4.653-.176 12.988-.351 14.04-.176 1.054 5.047 2.5 7.722 2.282 3.625-.294 10.134-2.361 9.828-4.738-.95-7.374-1.775-19.285-1.93-28.958-.191-11.882 2.905-23.864 1.228-35.628-1.268-8.901-3.665-13.94-7.634-24.396-.067-.175-.142-.248-.234-.234zm-79.416 3.146c-1.49.112-6.428 8.434-17.981 7.353-5.924-.554-6.796-5.866-7.074-4.344-2.118 11.616-1.892 14.45-1.985 21.719-.098 7.585 1.196 15.129 1.489 22.71.272 7.027.766 14.083.248 21.097-.346 4.68-.584 8.314-1.795 13.197-.34 1.37 1.82 2.654 3.204 2.936 4.512.92 13.682.385 13.607-2.11-.19-6.362.97-15.553 2.182-23.025 2.117-13.048 7.344-25.136 8.739-38.28.707-6.664.373-9.773-.124-20.105-.04-.841-.2-1.171-.51-1.148z"
        ></path>
        <path
          id="torso"
          className={selectedSection === "torso" ? classes.active : ""}
          strokeWidth="2"
          d="M195.072 114.541c.352-1.128 10.855 3.537 17.114 3.75 13.718.467 41.707-4.592 41.069-2.984-4.013 10.105-5.826 11.781-4.915 17.902 1.081 7.256 6.079 12.04 12.132 19.348-4.34 14.702-11.29 32.247-11.346 47.846-.03 8.627 8.496 19.055 12.553 30.562.702 1.993-22.396 9.277-29.836 18.253-5.79 6.985-7.034 15.04-9.653 25.448-3.741 2.512-9.56 1.812-13.514-.35-9.239-5.054-9.906-19.098-17.726-26.151-3.353-3.024-7.75-4.04-11.934-6.406 1.031-20.268 6.309-23.949 7.722-36.242 1.23-10.694.298-23.808-.176-32.907-2.655-1.41-4.865-2.543-6.325-4.509-1.955-2.633-2.741-5.51-2.878-8.788-.145-3.466 1.64-6.563 2.96-9.771.958-2.328 2.575-4.34 3.599-6.64 3.919-8.803 8.05-18.425 11.154-28.36z"
        ></path>
      </g>
    </svg>
  );
};
