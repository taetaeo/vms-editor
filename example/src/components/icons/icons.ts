import styled from "@emotion/styled";
import { FaAlignLeft, FaAlignRight, FaAlignCenter, FaAlignJustify, FaRegFileImage, FaFileVideo, FaBold, FaUnderline } from "react-icons/fa";
import { BiSolidArrowToBottom, BiSolidArrowFromBottom } from "react-icons/bi";
import { IoText, IoTriangleSharp } from "react-icons/io5";
import { MdRectangle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

/** 정렬 */
export const LeftSortIcon = styled(FaAlignLeft)`
  pointer-events: none;
`;
export const RightSortIcon = styled(FaAlignRight)`
  pointer-events: none;
`;
export const CenterSortIcon = styled(FaAlignCenter)`
  pointer-events: none;
`;
export const BottomSortIcon = styled(BiSolidArrowToBottom)`
  pointer-events: none;
`;
export const TopSortIcon = styled(BiSolidArrowFromBottom)`
  pointer-events: none;
`;

export const BothSideIcon = styled(FaAlignJustify)`
  pointer-events: none;
`;

/** 객체 모형 */
export const TextIcon = styled(IoText)`
  pointer-events: none;
`;
export const ImageIcon = styled(FaRegFileImage)`
  pointer-events: none;
`;
export const VideoIcon = styled(FaFileVideo)`
  pointer-events: none;
`;
export const RectIcon = styled(MdRectangle)`
  pointer-events: none;
`;
export const TriIcon = styled(IoTriangleSharp)`
  pointer-events: none;
`;
export const CircleIcon = styled(FaRegCircle)`
  pointer-events: none;
`;

/** 텍스트 스타일 */
export const BoldIcon = styled(FaBold)`
  pointer-events: none;
`;
export const UnderLineIcon = styled(FaUnderline)`
  pointer-events: none;
`;

/** 방향표 */
export const downTriArrow = styled(IoMdArrowDropdown)`
  pointer-events: none;
`;

/** 햄버거 */
export const HamburgerIcon = styled(GiHamburgerMenu)`
  pointer-events: none;
`;
