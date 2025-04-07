import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Dropdown = ({
    icon,
    items
}: {
    icon: React.ReactNode;
    items: Array<string | React.ReactNode | JSX.Element>;
}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="p-2 text-white rounded-full flex items-center justify-center">
                {icon}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="p-2 bg-white shadow-lg rounded-md">
                {items.map((item, index) => (
                    <DropdownMenu.Item key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                        {item}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default Dropdown;