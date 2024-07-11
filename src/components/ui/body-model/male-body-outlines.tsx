import { useState } from "react";
import classes from "./body-model.module.css";

interface MaleBodyOutlinesProps {
  onSectionSelect: (section: string) => void;
  props?: any;
}

export const MaleBodyOutlines = ({
  onSectionSelect,
}: MaleBodyOutlinesProps) => {
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
          d="M271.622 117.854c-1.764-.002-3.442.448-4.927 1.502-9.196 6.526-8.536 16.591-7.567 22.718.887 5.611 5.43 10.48 10.815 12.29 6.837 2.3 17.59 1.488 23.875-3.448 5.29-4.155-.156-16.228-5.025-22.669-3.492-4.618-10.873-10.387-17.171-10.393zm-80.988 4.194c-.122 0-.261.015-.418.046-5.2 1.024-13.173 7.291-15.433 12.847-2.824 6.942-6.733 17.324-6.245 24.664.146 2.195 13.391.283 12.78-1.51-2.13-6.237-2.223-10.622-.883-15.075 1.372-4.556 4.424-7.71 6.665-11.906 1.534-2.873 6.02-9.063 3.534-9.066zm109.692 28.126c-2.444.04-6.263 6.879-9.69 8.423-10.283 4.633-19.49.22-18.415 1.627 0 0 22.567 29.957 29.404 40.271 2.56 3.861-.387-4.325 5.517-9.942 8.7-8.275 18.897-1.554 15.65-5.785-8.52-11.101-16.298-24.736-21.138-33.633-.373-.685-.821-.97-1.328-.961zm-132.27 12.607c-1.454.012-2.526.289-2.822.888-2.153 4.361-4.62 8.51-7.602 12.298-3.113 3.954-6.706 8.089-10.225 10.81-3.763 2.91 3.471.543 11.231 8.195 7.79 7.681 6.525 15.185 8.832 11.068 1.042-1.861 5.801-9.023 9.607-13.487 3.025-3.55 7.698-7.35 10.628-10.978 1.8-2.228-3.834-12.106-8.714-15.624-2.69-1.938-7.736-3.196-10.935-3.17zm154.296 26.506c-3.68.006-8.664 1.556-11.412 3.714-4.395 3.451-7.144 11.654-4.378 15.537 6.114 8.586 9.15 13.405 15.02 22.688 2.508 3.966 4.862 9.952 5.217 17.154.141 2.864.24-4.198 6.957-5.06 7.122-.913 12.907 6.795 10.909 2.135-7.598-17.715-10.967-36.296-17.866-54.309-.502-1.31-2.24-1.863-4.447-1.86zm-180.211 2.815c-.535.01-.922.123-1.11.354-4.18 5.138-11.601 19.443-17.737 28.633-6.068 9.087-18.357 23.462-19.769 25.633-1.153 1.774 3.696-1.733 9.277 1.912 1.69 1.104 1.744 4.596 2.598 3.544 4.507-5.552 12.953-13.525 20.208-19.643 8.547-7.207 24.594-18.641 26.831-20.123 1.94-1.285-2.372-10.157-6.596-14.086-3.598-3.348-10.813-6.277-13.702-6.224z"
        ></path>
        <path
          id="legs"
          className={selectedSection === "legs" ? classes.active : ""}
          strokeWidth="2"
          d="M263.67 229.76c-3.477-.097-17.492 13.817-23.534 26.012-3.593 7.252-7.092 28.01-7.444 39.062-.321 10.08 5.931 19.364 8.188 29.194 1.624 7.071 1.487 14.446 2.73 21.594 1.046 6.012 2.705 11.901 3.972 17.87.823 3.881.649 8.086 2.358 11.666 3.67 7.689 5.734 13.437 6.496 13.62 5.907 1.426 11.333-.75 15.133-4.01 4.987-4.275 1.863-10.043 3.439-22.144 2.482-19.064 4.946-39.018 3.723-58.204-1.602-25.15-14.025-61.261-14.271-73.716-.013-.631-.294-.931-.79-.945zm-75.423 10.774c-.052.004-.084.048-.095.135-2.9 24.178-6.9 47.577-6.592 71.818.169 13.29 2.872 28.938 7.102 40.454 1.09 2.968-.557 5.791-.343 9.654.355 6.415 2.757 10.605 2.921 15.541.1 3.028 3.934 6.289 6.95 6.577 5.16.495 9.39-.811 13.278-4.467 3.46-3.252 6.106-5.753 6.95-10.425 1.702-9.417 2.428-20.64 4.096-30.777 2.147-13.048 6.104-28.123 8.128-40.643-8.14.433-16.195 1.21-19.667-2.708-3.992-4.504-4.806-16.75-9.435-30.613-2.807-8.406-12.225-24.637-13.293-24.546zm91.372 141.38c-1.257.008-3.671 6.553-13.917 10.005-4.885 1.645-9.8-.23-9.888 1.52-.262 5.266 1.267 15.112 2.013 19.707 2.227 13.72 7.484 18.828 9.984 32.501.932 5.1 1.8 10.995 1.723 16.179-.029 1.965 5.906 2.428 9.66 1.953 1.993-.252 6.336-2 6.239-3.364-.427-5.99-1.424-11.96-1.377-17.966.09-11.779 4.273-23.454 3.246-35.189-.745-8.518-3.268-17.326-7.195-24.921-.152-.294-.308-.426-.488-.425zm-61.522.338c-1.722-.03-8.412 6.893-18.986 7.458-5.42.29-8.024-5.072-8.073-2.018-.085 5.304-.61 15.415.087 23.342 1.413 16.076 4.405 29.53 2.984 51.072-.077 1.168 2.29 2.517 3.423 2.808 9.378 2.409 15.331-1.215 15.356-2.896.164-10.95.891-19.159 1.755-30.625.382-5.071 5.016-9.117 5.88-14.129 1.97-11.436 1.479-20.685-2.019-34.662-.06-.238-.196-.347-.407-.35z"
        ></path>
        <path
          id="torso"
          className={selectedSection === "torso" ? classes.active : ""}
          strokeWidth="2"
          d="M196.702 122.936c1.373-1.845 13.885 4.545 22.273 5.086 12.963.835 42.878-9.594 41.062-7.059-6.267 8.75-7.028 19.082-3.985 26.509 4.357 10.636 20.958 22.91 20.07 27.11-2.59 12.226-9.724 17.2-12.06 27.992-1.676 7.74-.074 22.67-1.114 23.161-12.942 6.104-18.373 12.158-26.908 28.424-3.332 6.352-6.359 37.706-7.197 37.975-5.839 1.873-14.168 1.776-15.077-.861-1.696-4.924-6.699-22.99-10.621-33.737-3.616-9.908-13.083-23.105-13.487-27.642-.97-10.91 3.007-19.42 2.699-25.127-.68-12.584-.588-21.095-3.076-30.047-.785-2.822-6.544-19.645-6.075-25.856.494-6.537 8.596-19.346 13.496-25.928z"
        ></path>
      </g>
    </svg>
  );
};
