import React, { createElement } from "react";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";

interface IconProps {
    defaultClassName: string;
    mxIconOverride?: WebIcon;
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    title?: string;
}

const MxIcon = ({ defaultClassName, mxIconOverride, title, onClick }: IconProps): React.ReactElement =>
    mxIconOverride !== undefined ? (
        <div onClick={onClick} title={title}>
            <Icon icon={mxIconOverride} altText={title} />
        </div>
    ) : (
        <span
            onClick={onClick}
            className={`glyphicon glyphicon-${defaultClassName}`}
            aria-hidden="true"
            title={title}
        />
    );

export default MxIcon;
