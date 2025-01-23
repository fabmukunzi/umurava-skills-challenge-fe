import {
  Menubar,
  MenubarMenu,
} from '@/components/ui/menubar';

const Navbar = () => {
  return (
    <Menubar className='py-10 rounded-none border-black'>
      <MenubarMenu>Hello</MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
