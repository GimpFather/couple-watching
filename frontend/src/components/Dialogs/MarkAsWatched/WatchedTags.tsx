import { Stack } from "@mui/material";
import { useState } from "react";
import NBChip from "~/components/NeoBrutalism/NBChip";
import { MOVIE_TAGS } from "~/constants/tags";

const WatchedTags = () => {
    const movieTagsAlphabeticallySorted = MOVIE_TAGS.sort((a, b) => a.label.localeCompare(b.label));
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagClick = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    return (
        <Stack flexDirection='row' flexWrap='wrap' gap={0.5}>
            {movieTagsAlphabeticallySorted.map((tag) => (
                <NBChip key={tag.id} label={tag.label} icon={tag.icon as React.ReactElement} active={selectedTags.includes(tag.id)} onClick={() => handleTagClick(tag.id)} />
            ))}
        </Stack>
    );
};

export default WatchedTags;