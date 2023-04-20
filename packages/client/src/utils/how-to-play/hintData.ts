export interface IHintData {
  title: string,
  description: string,
  additional: string,
}

export const hintData: IHintData[] = [
  {
    title: 'Управление',
    description: 'Для передвижения персонажа используйте набор кнопок W, A, S, D, где:',
    additional: 'W / S - движение вперёд-назад, A / D - движение боком',
  },
  {
    title: 'Собрания',
    description: 'Вы можете созвать экстренное собрание. Для этого подойдите к нужном столу и нажмите кнопку',
    additional: 'Прим.: Кнопка "Собрание"'
  },
  {
    title: 'Голосования',
    description: 'Во время собрания вы можете проголосовать за члена экипажа, которого подозреваете',
    additional: 'Но помните, это не просто голосование. Если его выберут все - он будет уничтожен'
  },
  {
    title: 'Победа',
    description: 'Для победы в игре в роли предателя (роль по умолчанию) вам необходимо устранять других членов экипажа',
    additional: 'Для этого подойдите к ним на минимальное расстояние и нажмите на появившуюся кнопку в правом нижнем углу'
  },
  {
    title: 'Поражение',
    description: 'Если вас устранят (предатель или же во время голосования) - вы, как игрок, проигрываете. Но для команды это ещё не означает поражение',
    additional: 'На текущем этапе реализации игры вы не сможете ничего сделать, но в дальнейшем мы дадим вам возможность летать по карте в качестве призрака'
  },
  {
    title: 'А можно просто побегать?',
    description: 'Да, вы можете просто побегать по карте и ознакомиться с ней',
    additional: 'Используйте клавиши управления персонажем WASD. И помните, за вами может вестись охота',
  },
];
