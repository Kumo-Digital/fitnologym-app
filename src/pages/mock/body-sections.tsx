import { useState } from "react";
import { Stack, Title } from "@mantine/core";
import { BodyModel } from "@/components/ui/body-model/body-model";

const BodySections = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const onSectionSelect = (section: string | null) => {
    setSelection(section);
  };

  return (
    <section>
      <Stack>
        <Title>Body Sections</Title>
        <BodyModel gender="female" onSectionSelect={onSectionSelect} />
      </Stack>
    </section>
  );
};

export default BodySections;
