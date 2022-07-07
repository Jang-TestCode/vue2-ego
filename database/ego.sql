--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) DEFAULT NULL,
  `name` text,
  `cid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`, `cid`) VALUES
(1, '家用电器', 1001),
(1, '手机/运营商/数码', 1002),
(1, '电脑/办公', 1003),
(1, '家具/家居', 1004),
(1001, '电视', 10011),
(1001, '空调', 10012),
(1001, '洗衣机', 10013),
(1001, '冰箱', 10014),
(1002, '手机通讯', 10021),
(1002, '运营商', 10022),
(1002, '摄影', 10023),
(1002, '摄像', 10024),
(1003, '电脑整机', 10031),
(1003, '电脑配件', 10032),
(1003, '外设产品', 10033),
(1003, '游戏设备', 10034),
(1004, '厨具', 10041),
(1004, '家纺', 10042),
(1004, '灯具', 10043),
(1004, '家具', 10044),
(10011, '超薄电视', 100111),
(10011, '全面屏电视', 100112),
(10021, '手机', 100211),
(10021, '对讲机', 100212),
(10031, '台式机', 100311),
(10031, '一体机', 100312),
(10041, '烹调用具', 100411),
(10041, '洗涤用具', 100412);


-- --------------------------------------------------------

--
-- 表的结构 `content`
--

CREATE TABLE `content` (
  `id` int(11) DEFAULT NULL,
  `name` text NOT NULL,
  `pid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `content`
--

INSERT INTO `content` (`id`, `name`, `pid`) VALUES
(1, '广告分类', 1001),
(1001, 'banner广告', 10001),
(1001, '直播代购', 10002),
(1001, '电子产品广告', 10003),
(19412, '刚刚赚了很多钱', 89602),
(1001, '京东618', 90410),
(90410, '电脑', 56320),
(1001, '2020京东618', 593143);

-- --------------------------------------------------------

--
-- 表的结构 `contentinfo`
--

CREATE TABLE `contentinfo` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `contentinfo`
--

INSERT INTO `contentinfo` (`id`, `pid`, `name`, `url`, `image`) VALUES
(1, 10001, 'OPPO Watch', 'https://pro.jd.com/mall/active/tG3nBBhghqhfM69HoJw9ZoDaT7d/index.html?extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjg5YzRjMTUyLWUwZjktNGQ0OC05NDI4LTJhODQ4NWJjNTc1N1wiLFwibWF0ZXJpYWxfaWRcIjpcIjE4NTAxMDcyMjlcIixcInBvc19pZFwiOlwiNDI3MlwiLFwic2lkXCI6XCJmODcwZmM2MS1jYjc3LTQwN2UtOTM1ZC1jYzhlZTc0MTYyZTdcIn0ifQ==&jd_pop=89c4c152-e0f9-4d48-9428-2a8485bc5757&abt=1', '//img14.360buyimg.com/pop/s1180x940_jfs/t1/110562/14/10737/42247/5e81bb76E6fffa006/b3f703f750bd37ea.jpg.webp'),
(2, 90410, '椅子', 'https://channel-m.jd.com/pc/psp/10979325649?imup=CgwKBnd3dGxpdRIAGAASEAjR7azzKBDmZhoAIJpNKAEYsRsgACoUaWwsdWEseGdiLGdhLGNpYSxiYWEyAmlsOioKCWpkX2hiZHl5MRDnYRgCIJL50ty1x-S1dyjCo6Q3MMGjpDc4E0CAgCA&extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjJiNmEyNjE5LWE4MmItNGMyNi1iYzYwLWI3ZGE1NzljOWRkZVwiLFwibWF0ZXJpYWxfaWRcIjpcIjg2MDUxMzIyOTY2NTg2NjQ1OTRcIixcInBvc19pZFwiOlwiMzUwNVwiLFwic2lkXCI6XCJmN2Y5ODM2ZS0yZTViLTQyMTUtYWNiMi04NDdmZmI2N2U2ZDdcIn0ifQ==&jd_pop=2b6a2619-a82b-4c26-bc60-b7da579c9dde&abt=0', 'https://img12.360buyimg.com/pop/s1180x940_jfs/t1/117573/18/9029/83238/5ed7c92aE789977c2/b11a288a7284cdfe.jpg.webp');

-- --------------------------------------------------------

--
-- 表的结构 `params`
--

CREATE TABLE `params` (
  `id` int(11) NOT NULL,
  `itemCatId` text NOT NULL,
  `paramData` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `params`
--

INSERT INTO `params` (`id`, `itemCatId`, `paramData`) VALUES
(10007, '10001', '[{"value":"品牌","children":[{"childValue":"戴尔","value":""},{"childValue":"宏碁","value":""},{"childValue":"mac","value":""},{"childValue":"小米","value":""}]},{"value":"内存","children":[{"value":"","childValue":"256"},{"childValue":"固态","value":""}]}]'),
(10008, '10002', '[{"value":"主题","children":[{"childValue":"好看","value":""}]},{"value":"时么","children":[{"value":"","children":[],"childValue":"时的1"},{"childValue":"是的2","value":""}]}]'),
(10009, '10003', '[{"value":"空调","children":[{"childValue":"123","value":""},{"childValue":"123","value":""}]}]'),
(10010, '10004', '[{"value":"电脑","children":[{"childValue":"网线","value":""},{"childValue":"接口","value":""}]},{"value":"鼠标","children":[{"childValue":"有限","value":""}]}]');

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `sellPoint` text NOT NULL,
  `price` text NOT NULL,
  `cid` text NOT NULL,
  `num` text NOT NULL,
  `barcode` text NOT NULL,
  `status` text NOT NULL,
  `created` text NOT NULL,
  `updated` text NOT NULL,
  `descs` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`id`, `title`, `image`, `sellPoint`, `price`, `cid`, `num`, `barcode`, `status`, `created`, `updated`, `descs`) VALUES
(10032, '三体-刘慈欣', '', '未来科幻', '99', '', '1', '', '', '', '', '<p>这是大刘的得意之作，连奥巴马都喜欢看！</p>'),
(10033, '梦里花落知多少', '', '小时代！！！', '11', '', '11', '', '', '', '', '<p>还不错，但是要看书籍，不要看电影</p>'),
(10034, '我与地坛', '', '做一个不动声色的人', '55', '', '64', '', '', '', '', '<p>人生尔尔，错过了，就是一辈子</p>'),
(10035, '舞！舞！舞！', '', '村上春树经典作品', '34', '', '34', '', '', '', '', '<p>人不是慢慢变老的，而是一瞬间变老的</p>'),
(10036, '岁月神偷', '', '经典书籍', '23', '', '23', '', '', '', '', '<p>我没有精力去认识一个新的人，或者花力气去宠福新维系一段感情，跟没办法在把自己的故事讲述一遍又一遍</p>'),
(10037, '解忧杂货店', '', '无论现在有多么的不开心，你要相信明天会比今天更好', '34', '', '12', '', '', '', '', '<p>无论现在有多么的不开心，你要相信明天会比今天更好!!!!</p>'),
(10038, '小王子', '', '写给成年人的童话故事', '20', '', '1', '', '1', '', '', '<p>所有人都曾是小孩，虽然之后少数人记得</p>'),
(10039, '笑场', '', '李诞的作品，很有意思，集成了扯经', '55', '', '100', '', '1', '', '', '<p>未曾开言，我先笑场，笑过之后，听我来诉一诉衷肠</p>'),
(10040, '万历十五年', '', '人民的名义里面出现过很多次', '45', '', '26', '', '1', '', '', '<p>在明朝当皇帝其实没那么幸福，比其清朝来说，还是清朝的皇帝牛逼，毕竟清朝才是更加牛逼的中央集权制</p>'),
(10041, '万寿寺【王小波】', '', '很好看', '20', '', '99', '', '1', '', '', '<p>值得看一看</p>'),
(10042, '【精】梁羽生闲说金瓶梅', '', '好看', '33', '', '55', '', '1', '', '', '<p>非常好看</p>');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES
(1, 'iwen', '123', 'iwen@iwenwiki.com'),
(2, 'ime', '123', 'ime@iwenwiki.com'),
(3, 'iwens', '123', 'liuxingyu@sxt.cn'),
(4, 'sakura', '123', 'iwen@sxt.cn'),
(5, '张三', '123', 'iwen@sxt.cn'),
(6, '李四', '123', 'iwen@sxt.cn');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contentinfo`
--
ALTER TABLE `contentinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `params`
--
ALTER TABLE `params`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `contentinfo`
--
ALTER TABLE `contentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `params`
--
ALTER TABLE `params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10011;
--
-- 使用表AUTO_INCREMENT `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10043;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

