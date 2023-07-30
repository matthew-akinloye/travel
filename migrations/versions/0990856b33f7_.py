"""empty message

Revision ID: 0990856b33f7
Revises: 
Create Date: 2023-07-30 22:02:48.615486

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0990856b33f7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('travel',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('price', sa.String(length=200), nullable=False),
    sa.Column('duration', sa.String(length=11), nullable=True),
    sa.Column('description', sa.String(length=11200), nullable=False),
    sa.Column('caption', sa.String(length=200), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('travel', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_travel_id'), ['id'], unique=False)

    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fullname', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password_hash', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_id'), ['id'], unique=False)

    op.create_table('imagefive',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('travel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_id'], ['travel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('imagefive', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_imagefive_id'), ['id'], unique=False)

    op.create_table('imagefour',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('travel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_id'], ['travel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('imagefour', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_imagefour_id'), ['id'], unique=False)

    op.create_table('imageone',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('travel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_id'], ['travel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('imageone', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_imageone_id'), ['id'], unique=False)

    op.create_table('imagethr',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('travel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_id'], ['travel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('imagethr', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_imagethr_id'), ['id'], unique=False)

    op.create_table('imagetwo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('travel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_id'], ['travel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('imagetwo', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_imagetwo_id'), ['id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('imagetwo', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_imagetwo_id'))

    op.drop_table('imagetwo')
    with op.batch_alter_table('imagethr', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_imagethr_id'))

    op.drop_table('imagethr')
    with op.batch_alter_table('imageone', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_imageone_id'))

    op.drop_table('imageone')
    with op.batch_alter_table('imagefour', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_imagefour_id'))

    op.drop_table('imagefour')
    with op.batch_alter_table('imagefive', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_imagefive_id'))

    op.drop_table('imagefive')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_id'))

    op.drop_table('user')
    with op.batch_alter_table('travel', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_travel_id'))

    op.drop_table('travel')
    # ### end Alembic commands ###
